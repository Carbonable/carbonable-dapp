import { useAccount, useContractWrite } from "@starknet-react/core";
import { useCallback, useEffect, useState } from "react";
import { type Call, TransactionStatus, num } from "starknet";
import { useNotifications } from "~/root";
import { NotificationSource } from "~/utils/notifications/sources";
import { getImageUrlFromMetadata, getStarkscanUrl, shortenNumber } from "~/utils/utils";
import SVGMetadata from "../Images/SVGMetadata";
import { GreenButton } from "../Buttons/ActionButton";
import _ from "lodash";
import MigrationDialog from "./MigrationDialog";

export default function ProjectCard({ project, toMigrate, setRefreshData }: { project: any, toMigrate?: boolean, setRefreshData: (b: boolean) => void }) {
    const walletShares = project.tokens.reduce((acc: any, token: any) => acc + parseFloat(token?.value?.displayable_value), 0);
    const shares = walletShares + parseFloat(project.total_deposited_value?.displayable_value) ?? 0;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isRawSVG, setIsRawSVG] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const calls: Call[] = [];
    const [txHash, setTxHash] = useState<string | undefined>("");
    const { notifs, setNotifs, mustReloadMigration, setMustReloadMigration, defaultNetwork } = useNotifications();
    const [starkscanUrl] = useState(getStarkscanUrl(defaultNetwork));
    const { address } = useAccount();

    // check if project is in notification list
    const [isMigrating, setIsMigrating] = useState(false);
    console.log(project)

    useEffect(() => {
        setIsMigrating(_.some(notifs, (notification: any) => notification.project === project.id && notification.source === NotificationSource.MIGRATION));
    }, [notifs]);

    useEffect(() => {
        if (mustReloadMigration === true) {
            setRefreshData(true);
            setMustReloadMigration(false);
        }

    }, [mustReloadMigration]);

    useEffect(() => {
        if (project.image) {
            getImageUrlFromMetadata(project.image).then((url) => {
                setImageSrc(url.imgUrl);
                setIsRawSVG(url.isSvg);
            });
        }
    }, [project.tokens]);


    const { writeAsync } = useContractWrite({ calls });

    const handleMigrate = useCallback(async (project: any) => {
        const migrateData = [project.tokens.length];

        calls.length = 0;

        calls.push({
            contractAddress: project.address,
            entrypoint: 'setApprovalForAll',
            calldata: [project.migrator_address, 1]
        });

        project.tokens.forEach((token: any) => {
            migrateData.push(parseInt(num.hexToDecimalString(token.token_id)), 0);
        });

        calls.push({
            contractAddress: project.migrator_address,
            entrypoint: 'migrate',
            calldata: migrateData
        });

        calls.push({
            contractAddress: project.address,
            entrypoint: 'setApprovalForAll',
            calldata: [project.migrator_address, 0]
        });

        const result = await writeAsync();
        setTxHash(result?.transaction_hash);
        return;
    }
        , [setTxHash]);

    useEffect(() => {
        // When txHash is set, add toast notification
        if (txHash !== undefined && txHash !== "" && _.find(notifs, (notification: any) => notification.txHash === txHash) === undefined) {
            setNotifs([...notifs, {
                txHash: txHash,
                project: project.id,
                source: NotificationSource.MIGRATION,
                txStatus: TransactionStatus.RECEIVED,
                walletAddress: address,
                message: {
                    title: `Migrating ${project.name}`,
                    message: 'Your transaction is ' + TransactionStatus.RECEIVED,
                    link: `${starkscanUrl}/tx/${txHash}`
                }
            }]);

            setIsMigrating(true);
            setIsOpen(true);
        }
    }, [txHash]);

    return (
        <>
            <div className="w-full" >
                <div className="relative group">
                    {isRawSVG === false &&
                        <img src={imageSrc.startsWith('https') ? imageSrc : `data:image/png;base64,${imageSrc}`} alt={`${project.name} NFT card`} className="w-full rounded-[8.8%]" />
                    }
                    {isRawSVG === true &&
                        <div className="w-full"><SVGMetadata svg={imageSrc} id={project.id} area={project.asset_area} carbonUnits={project.asset_carbon_unit} /></div>
                    }
                    {toMigrate && project.tokens.length > 1 &&
                        <div className="font-inter absolute top-6 left-6 md:top-4 md:left-4 xl:top-4 xl:left-4 bg-opacityLight-80 rounded-full text-neutral-900 text-center px-2 py-1 font-bold text-xs border border-opacityLight-90">
                            x{project.tokens.length}
                        </div>
                    }
                    {!toMigrate && <div className="font-inter absolute top-4 left-6 md:top-4 md:left-4 xl:top-4 xl:left-4 bg-opacityLight-80 rounded-full text-neutral-900 text-center px-2 py-1 font-bold text-xs border border-opacityLight-90">{shortenNumber(shares)} {shares > 1 ? 'shares' : 'share'}</div>}
                </div>
                {toMigrate && project.migrator_address && isMigrating === false &&
                    <GreenButton className="w-full mt-2" onClick={() => handleMigrate(project)}>
                        Migrate assets
                    </GreenButton>
                }
                {toMigrate && project.migrator_address === null && isMigrating === false &&
                    <GreenButton className="w-full mt-2 bg-greenish-800 text-neutral-300 hover:bg-greenish-800 cursor-not-allowed">
                        Migration coming soon
                    </GreenButton>
                }
                {toMigrate && isMigrating === true &&
                    <GreenButton className="w-full mt-2 cursor-not-allowed bg-greenish-800 text-neutral-300 hover:bg-greenish-800" disabled={true}>
                        Migrating...
                    </GreenButton>
                }
            </div>
            <MigrationDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}