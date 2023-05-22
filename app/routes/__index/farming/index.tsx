import { Link } from "@remix-run/react";

export default function Farming() {
    return (
        <div className="flex items-center justify-center flex-wrap w-2/3 m-auto h-[calc(100vh_-_120px)]">
            <div className="m-auto">
              <div className="text-6xl font-trash w-full text-center">COMING SOON</div>
              <div className="text-xl font-americana w-full text-center">The farming page is almost here. <br/>Be ready when it's out and start migrating your assets.</div>
              <div className="text-center mt-4">
                <Link to={"/portfolio"} className="text-green text-center">Go to portfolio</Link>
              </div>
            </div>
        </div>
    );
}       