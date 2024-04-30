import { useEffect, useState } from 'react';
import countries from '../../../../config/countries/countries.json';

export default function Countries({selectedCountry, setSelectedCountry}: {selectedCountry: string | undefined, setSelectedCountry: (country: string) => void }) {
    const [sortedCountries, setSortedCountries] = useState<any[]>([]);

    useEffect(() => {
        const sortCountries = () => {
            const sortedCountries = [...countries].sort((a, b) => {
                const nameA = a.name.common.toLowerCase();
                const nameB = b.name.common.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            setSortedCountries(sortedCountries);
        };

        sortCountries();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value);
    };

    return (
        <div className="border rounded-lg border-opacityLight-20">
            <div className="flex justify-between bg-opacityLight-5 py-2 px-3">
                <div className="uppercase text-sm flex-grow">Country of residence</div>
            </div>
            <div className="py-4 px-2 border-opacityLight-20">
                <div className="w-full border border-opacityLight-10 rounded-md py-2 px-3 hover:bg-opacityLight-5">
                    <select
                        value={selectedCountry}
                        onChange={handleChange}
                        className="w-full focus:outline-none border-0 focus:border-opacityLight5 text-neutral-100 cursor-pointer bg-transparent"
                    >
                        <option key='undefined_country' value={undefined}>
                            Select your country
                        </option>
                        {sortedCountries.map((country: any) => (
                            <option key={country.name.common} value={country.cca2}>
                                {country.flag} &nbsp; {country.name.common}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}