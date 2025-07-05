// /webapps/espa-libros/frontend/app/routes/HomePage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Logo from './../assets/logo.svg';


// Define el tipo de dato que recibes de la API
interface Libro {
    _id: string;
    titulo: string;
    autor: string;
    precio: number;
    imagenURL: string;
}

export default function HomePage() {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llama a /api/libros (gracias al proxy de Vite esto va a http://localhost:3000/api/libros)
        fetch("/api/libros")
            .then(async (res) => {
                if (!res.ok) throw new Error(`Error ${res.status}`);
                return res.json();
            })
            .then((data: { libros: Libro[]; total: number }) => {
                // Extraemos el array de libros del objeto devuelto
                setLibros(data.libros);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudieron cargar los libros.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando libros…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="bg-regal2-espalibros">

                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="mb-2">
                            
                                <Link to="/">
                                <img src={Logo} alt="Espa-Libros Logo" />
                            </Link>
                           


                        </div>
                    </div>

                    <div className="flex justify-end mb-3 ">

                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="48" height="48" fill="url(#pattern0_100_3)" />
                            <defs>
                                <pattern id="pattern0_100_3" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_100_3" transform="scale(0.0208333)" />
                                </pattern>
                                <image id="image0_100_3" width="48" height="48" preserveAspectRatio="none"
                                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADGElEQVR4Ae3BP2hUdwAA4O/9kkHkBguROhSaQSRgoIEWclAhD3rgbS5dpEuGgBTERRcJkhQdAurmYCHgUoSCoxSHB71AhhMcKiicVOEcKhYC3hBCIAEb+AUSvT/vLrW5O+j3JXiv2Y+4awgEraWGROJDJ/EnGvjMEAg+9BKvcQzfGAJBs0xUMgSCZpkoNQSCZploBkcMuKDZGp7iCIoGXNDaI1HZgAtaq4hSA25Ua6vYxDSOoWHPe4PjeNDaOh6LSgZTA2uj2sswgxIe2JPorxS/44UdQXuZaMZgmRT9YUfQ3hM0MIFxg2NCVLMjaG8bK6LU4JgSvbQj6OyRqGwwjOIr0aodQWcV0YzBMIkCXqBhR9BZDX/hBKb03xlR1a4gXyYq6b+i6IldQb5MVNJ/Z0WZXUG+TPQtRvVPEWN4jZpdQb63eI4CzuifsuihfYLuZKJU/5wTPbRP0J1HorL+mMAUGqjYJ+jOKrbxNQoO36zoV2zaJ+jOOh5jFCWHaxQ/iH7xkaB7majkcJXxBV5h1UeC7mWi7xyui6K7Wgi6V8U6JnDC4ZjCWWxiWQtB97axIio7HIuin9HQQtCbTJT6753BOWxiSRsjetPARZzECDbwxqdVxCxuooCf8Js2Er17htP2rKOGZ3iOGtZRF61jTTSGgmgcBUzgNCYxgYI9T1HEpjYSB1PC9yjjS5/WK2R4gEyOxL83hiImMY6TGMMxfI4jPrSJv9HAW9RRxzNUseZ/QyRxcCkuoyiq4jYqepPiMoqiKm6joguJg1nEgtau4YbuLGJBa9dwQ44RvUtxD9uYx3ncxDukKGEFdZ2luIdtzOM8buIdUpSwgroORvTuDk5hHkvYwAZWsYUSjuO+zu7gFOaxhA1sYBVbKOE47usg6N20aFmzZdG0fNOiZc2WRdNyBL1L5EvkS+RL5Ah6VxXNaTYnqspXFc1pNieqyjGid28wixRbqOEoLuE6Ai6grrM3mEWKLdRwFJdwHQEXUNdB4mAWsaC1q1jSnUUsaO0qluRIHFyKKyiKqriFit6kuIKiqIpbqOjCP8N7run6DvR6AAAAAElFTkSuQmCC" />
                            </defs>
                        </svg>
                    </div>



                    <div className="p-2 border-1 border-gray-500 bg-white">
                        <div className="flex items-center space-x-4">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="48" height="48" fill="url(#pattern0_4_9)" />
                                <defs>
                                    <pattern id="pattern0_4_9" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_4_9" transform="scale(0.0208333)" />
                                    </pattern>
                                    <image id="image0_4_9" width="48" height="48" preserveAspectRatio="none"
                                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB/klEQVR4Ae3BoWtUARwA4O89XzjkwoELFwwLC4oHlqEDjQMVB1Oc/8FA7RZB0zS7YBGjAweeIMyBwWAwGC4oKE5QMFxYWLjwwoULHvzCMaaww7e7d3LfZ9Il9qtjBTOK00YTHUcgMbCIl6gpXhvX0VKwRKjjG2rYRktxGriBXziNrgJlwgpq2MaS4n3EeczjgwKlQl346GjsCHMKlgo9ITNhUhMuFXpC5mhUhVzBUqEl3MK8Yi1hGT20FCwx8BrLwi66/l0NNeER7itYYiDDQ6zihOL8xDqeOAKJP6uj4t910DE1NTX1N4mDGpgxWl3soGNIiYFZvMCC8cjxAOuGkAkVbKGBXXw3Whku4DHaaDqkTFhBA1+xgNzoreIZ7qLpkFLhlLCJ3HhsCmcMIRV6QmZ8cqFqCKkJlyqPqpAbQir8EJZRNR63hc+GkAgVtHAGu3iPrtGZw0XhCt46pMTALDZx3njkuIMNQ0gc1EADFaPzA5+Qm5qampooiYEMa1jFjHLawybuIdd3zMArrOK48jqOcziH5/oy4TKuYQ9X0FJOJ/EOi1jCm1RYEJ6ipbza2BDm9aX26ym/tjCrLzXhUpOnInT1pcKecFb5XRW+6MuEJtZwDVvYRle5VHEJS+igqS8xsIiXqCm3Dm7inb7EfnWsoIGKcsmxgyZ2/S9+A1RtY4lYlb2JAAAAAElFTkSuQmCC" />
                                </defs>
                            </svg>
                            <Link to="/panel-crud">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <rect width="48" height="48" fill="url(#pattern0_4_11)" />
                                    <defs>
                                        <pattern id="pattern0_4_11" patternContentUnits="objectBoundingBox" width="1" height="1">
                                            <use xlinkHref="#image0_4_11" transform="scale(0.0208333)" />
                                        </pattern>
                                        <image id="image0_4_11" width="48" height="48" preserveAspectRatio="none"
                                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADb0lEQVR4Ae3BT2jVdQAA8M/79T1M2GHQwlEaAw3eYYdB89SkCQsXCE2YVCR0UXjHDkaGgo2MCAmTLTQ8aDhR2KACQQ8DFz5okYLDRR40Rk140oIdHvQOKxO+wny8v9seugd+Pp55ylKKdaDF+pbHgkdSok6Mo0dzyOJdzKdEV7ATefxtfXserchiexDtFG3GovWtHX+h10OJYovWvwWPSTS5xPrWjkFVBCuXxja8iN/xE+atzCBuYk5lbbiGNLYjq4ygfu/gCNJKZfExsmr7AMexiD2YVCpgHGnM4LoKErUFnMYFpHEff4hmkUcvruKg6npwTNSGy8goNYJ+5LALBRUkahvBPuSxH5twVfQlXsAXos+RUV4bxhFwAsMIOImTCKIMMihgN+ZVEVQ3gAzyeBNZpQo4iFmcwwgmcUexM+jEDRzAEu7gNDLYim8wItqPaTUkqjssGkZWdWP4FgEHFGvHIBYxhCXRGHYgh36MI+AzjKlDorI2vIYCRtXnK9Fbii3gDWzHnGLT2IYZ0Q84rE5BZV2iGygo7yO8r1QHWpG3bFJl8+jFAC5ZgaCyIFpSal6URlp5WzCjfnlMWKGgskXRRqWOYlKpFlwWzaisHWdwHhetQVDZLBaRRhq3LStgSqkh0c+q68IubMBFa5CobAnnRSNqa8WnojH1CaJu3EK/FUpUdxQL6MdJBOW1Yhxp/IpTirXgGkaVN4gu9Ir24jd0qSFRXQ57UEAGv2AvOkSdyOAWBpDDIJYU60AvdqlPP9LoUUNQ2xR2YBzdOKe8GxjCnCcoqM80XsE+DCGNjbiHm7iIMU9BUL8CRjFq5XKYwbRoDndxSTSFfbgpmkI/rqsheDIK6LZsDlstm8Imy87irDokmlyiyQXF+jSZoNhVTSYo9qPm8LpHgmJ9msMDjySaXKL5BI8Jont4Cd9hxvr2quiuh1KiQVxAi+awhN24lLKsEwPosHoBh0TDih0RDVubHKZw20PBsjmcsjZdOIS7+ESxvdiCCcxqkERjDYiySk2LBjRQorHeE11R6orobQ2UaJw+dCOH75WaQA496NMgicZowYjoBApKFfC16DhaNEDK6g3hmKgV7XiAP/Gf8hJsRgoLyIs+xIRVCFYvjU7FUnhZfdrRLtpqlVLWplP0HDYgrz6t+Af/iuY806T+BzBzyJlh+HqwAAAAAElFTkSuQmCC" />
                                    </defs>
                                </svg>
                            </Link>
                            <Link to="/login">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <rect width="48" height="48" fill="url(#pattern0_4_13)" />
                                    <defs>
                                        <pattern id="pattern0_4_13" patternContentUnits="objectBoundingBox" width="1" height="1">
                                            <use xlinkHref="#image0_4_13" transform="scale(0.0208333)" />
                                        </pattern>
                                        <image id="image0_4_13" width="48" height="48" preserveAspectRatio="none"
                                            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAExUlEQVR4Ae3BUWhdZwEA4O/ee5ApV+lD6A5asLiAB9OH2JXiQw0eGKW2Eco8hFtaXdA5HRahyKZFsBT1aXvYQ0FkioN2nIzuRhkbWtm4m1UIGlkqtR7kTjKZ5QxSzSBikUOxcAJ/r6mpSG4awe/zf3dZw9YW4TiOoo15nMRbVjVsXRFyZAYt4aN4y00tW1OEHBlKfAqPYQzjuBezbmraeiLkyFAixatYwrTaHquatpYIOTKUSFEIdqmtWNW0dUTIkaFEikKQIFc7Z1XT1hAhR4YSKQpBgh5idHHGqoa7L0KODCVSFIIEPcToooPKqqa7K0KODCVSFAY9iRh9dFC5RcvdEyFHhhIpCmv9CVOI8T5ccIuWuyNCjgwlUhSCUTyCBfRxEVOYwDZcsKpl80XIkaFEikKQ4DUcxgTOo4+LmMIEtuGCm1o2V4QcGUqkKAQJeohxHR/CBM6jj4uYwgTei5+1bJ4IOTKUSFEIRvEaYnRxCAexGxM4jz4+gL3Yje+0bI4IOTKUSFEY9FlkqHAEfXQxid2YwL04iQpHcaVl+CLkyFAiRWGteYxhFx7ES1hEF5PYjQdQ4Qied1PLcEXIkaFEikKQ4Cz+hiuYxRj2IsNLWEQXk9iGI3jeqpbhiZAjQ4kUhSBBD+PI8HtcxizGsBcZnsNVPIuz+LlbNA1HhBwZSqQoBAl6iHEJEXJkqDCnFiNWW0bhX7RsvAg5MpRIUQgS9BCji/34Kw7iQdyHx9ROYNY6WjZWhBwZSqQoBAl6iNFFBxXm8A4OYlztBJ5yBy0bJ0KODCVSFIIEPcToooNKMId38AC+iqf8BxrWF2ESh7APidoy+ijwPcwhR4YSKQpBgh5idNFBZQM0/HvT+AZG3dkSRlAiRSFI0EOMLjqobJCGtdr4ITK1S5jBT3EZFUawEwfwZcQokaIQJOghRhcdVDZQw6A2foJ9WMajmLG+CJNYwKIgQQ8xuuigssEaBp1HhkWkWPTfSdBDjC46qAxBJDiGDMv4JBYNijCONlawgMpaO9FDjC46qAxJpHYPnlA7gcKg4ziFEcESTuOMQeOIsYwOKkPUUsswjUv4kkE5Hsd78DZ+g3djOw5iFD8S9HEU78ev8QdD1FL7NhKcxrzgOB7HCh7CNJ7Bk3gD+7EH1/ArtRt4F/bj73jBEDXV7ld7WRDhlNoXMGPQOTyqdsqgl9X2GbKm2g61vmAcI3gbM27vHK5hBHsEC2r3GbKm4LpBbbXC+i6rta0VGbImIrXIoBW1D1vfmNqKoK123ZA1UeHPiDAqWMASYnTc3jGMYAnzglG1Nw1ZU21O7ROCCqfVnsYxg47hu2qnDTqg9gtDFqn9GJ/GQ/i+4Aw+hqM4iydQIEGs9izOCCJ8Xu1FQ9ZS+yM+h4/gd7gimMU17MV27EQbS/gavm7QFB7BG/gKbhiihuBhPI0SH0ffoAjjaGMF89Yaxeto4zM4Z8hagt/ifuzGflzAXwQ3cBWLuGqtBK9gBM/hmzZBS3ADL+AQdmEKb+KKO5vGeWzHLzGFf9gEDWu1MYNDanP4AV5FX7ATB/BFjKt1MY0Vm6Th9iJM41uIBRVK7DCoxEk8Y5M1rK+NwziMPfigYAmv4EXMoPI/4B7ssIX8E25DQ1oamg57AAAAAElFTkSuQmCC" />
                                    </defs>
                                </svg>

                            </Link>

                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="48" height="48" fill="url(#pattern0_4_15)" />
                                <defs>
                                    <pattern id="pattern0_4_15" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_4_15" transform="scale(0.0208333)" />
                                    </pattern>
                                    <image id="image0_4_15" width="48" height="48" preserveAspectRatio="none"
                                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAEx0lEQVR4Ae3BUWiU9wEA8F8u38M9HOOEGxN2D1coGKZQYUKPvfQQJQGz1dl0KzPbLLN43aTLSsYqbVlESgs6GsuKCoYMnDOjbssggqJC2im9sLboUJeB2rjlIQ95COVo7+FjLPAPXL7eJVXbxBv09/Ol5aWRtoLafH5pFFHCo8gjgzwiQYxpVDGNCYyjgprPoc39SeMp7MEmRJqrCdKaq+E9DGEENfeozb3JoYyfYa0gxvuoYBw3UcWUpAIyeBglFPFNRIIZvImjmHWX2ty9Mg4iI7iKQxhF1f3JYDv68Yigil/guLvQ5rPlcQTdgjM4hHFfrBL6sU0whmcwYxltlteNYeQwi2dx2srqwRHkMIunMWYJ7ZbWi1PI4Ay+jYqVdwOnsA4b8T18iH9ool1zT+EkUjiMH+Ejq+cj/AFr8C3swHXc8CntGm3Bn5DCYfR5cM5iDYrYgXdx2yLtknI4j6/gTTznwTuLr6KIzTiBjy1ISRrEWlxFn9bRh6vIY9AiKXVF7ESMXYi1jhi7EGMnNlmQUveC4De4ovVcwWHBCxakBHlsExzXuo4KHsda81KCLkS4jJta101MIEK3eZFgi2DE0jqwBx2YxDFMai7CLnQKzuF3iDXXgT3owCSOYVJzp/EoSjgeCTYIrmmuG28hLehCGU9iTFKE8yip68FObEUsqRtvIS3oQhlPYkyj9wQbzEsJ1gmmNMpgGGkMYSv2I41hZCT1o4Rp/BDfxRWU0C8pg2GkMYSt2I80hpHRaFqwzryUIBJMa1REDhPYjQsYwDnkUJTULXgGv8conhV0SyoihwnsxgUM4BxyKGo0LUibl5IUa5QRzEiqCjKSMoJZdVVBRlJGMCupKshoVLNISlAVFDSqIEYntiBCCZ2IUZF0SXAQeWTxK8ElSRXE6EQvIpTQiRgVjQoWiQR3sB4FTEmawX4cwHlJL2NG0gCeQAn/UTeDAUkz2I8DOIET6l7GjEZ5wb/MaxdsxjdwGR9o9A7u4CGswXXswxsafYw/4mv4Oj7BX/B9zGj0Du7gIazBdezDG5rbjO24jJE2QT8O4q/YrrWN4nHsw2spwZigEzmtK4dtglHzUoJJvI80erSuXkSYwKR5KXWDgheR1Xpy+LXgkAUpdSO4jjwGtZ4jyGICpy1IqYtRRowfo1vr6EUPaihbpF3Sv9GOEr6Dv+O2B6sHJ5DCLzFqkXaNLmE9NuIH+CdueDB6cAoRDmPAp7Rr9F/8GeuxATvwLm5bPRGexxFEGMJPNZHSXIweTCFCzuop4G84iAivYLclRJZWRAGzGLXysijjRWQwjadxwTIiS9srGELNying59iFrOAk9mLOZ4g0l8MTiHFUcx14FQVU8DYqmLK8LEp4DEVsQiS4iNdwwV2KNLcbaZzBlKQsDqCMSLARZcEc5jCNqiCDPLLISqrhJAZxxT2KNIqwR/BbdRHKOIAsYhzDCIoo4jFkkUVBczVMYBzjqKDmPkUadaGAWzgr6MLr6BBcRB+uCcbVZZFFHhlBFdOYw5wvUKTRXsFRdOB1dAluoQ9jljaHOUxZBZGkh9EpeASvIsIcXsEgYi0kklRW14sYx/ASZrWgSF0aP1F3EX24poVF6iLUcAt9GPN/KONLq+t/yBMpA7lzfgsAAAAASUVORK5CYII=" />
                                </defs>
                            </svg>
                            <div className="grid w-full ml-auto max-w-lg grid-cols-1 lg:max-w-xs">
                                <input type="search" name="search" aria-label="Search"
                                    className="border-1 border-gray-500 col-start-1 row-start-1 block w-full bg-white py-1.5 pr-3 pl-10 text-lg font-bold  placeholder:text-lg placeholder:font-bold text-gray-900 placeholder:text-gray-400 placeholder: text-gray-900 outline-hidden placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-white/40 sm:text-sm/6"
                                    placeholder="Buscar libros" />
                                <svg className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:items-center md:justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">Libros mas leidos de la
                            semana
                        </h2>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-5 md:gap-y-0 lg:gap-x-8">
                        {libros.map((libro) => (
                            <div key={libro._id} className="group relative mb-5">
                                <Link to={`/libros/${libro._id}`}>
                                    <div className="w-full h-55 overflow-hidden bg-gray-200 group-hover:opacity-75">
                                        <img
                                            src={libro.imagenURL}
                                            alt={libro.titulo}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-1 text-sm text-gray-700">
                                        {libro.titulo}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Comprar
                                    </button>
                                    <p className="text-sm font-medium text-gray-900">
                                        ${libro.precio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-500 py-3 ">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                            <a href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing
                                    <span className="font-medium">1</span>
                                    to
                                    <span className="font-medium">10</span>
                                    of
                                    <span className="font-medium">97</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs bg-regal3-espalibros "
                                    aria-label="Pagination">
                                    <a href="#"
                                        className="relative border-1 border-gray-500 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        <span className="sr-only">Previous</span>
                                        <svg className="size-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd"
                                                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                    <a href="#" aria-current="page"
                                        className="relative border-1 border-gray-500 z-10 inline-flex items-center bg-regal-espalibros px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                                    <span
                                        className="relative border-1 border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">...</span>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                                    <a href="#"
                                        className="relative border-1 border-gray-500 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                        <span className="sr-only">Next</span>
                                        <svg className="size-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-sm md:hidden">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Shop the collection
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                </div>
            </div>

        </>
    );
}
