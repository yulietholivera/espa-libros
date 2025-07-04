// /webapps/espa-libros/frontend/app/routes/HomePage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router";


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
                            <svg width="225" height="78" viewBox="0 0 225 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M119.384 72.5408V51.4499H123.843V68.8643H132.885V72.5408H119.384ZM140.297 51.4499V72.5408H135.838V51.4499H140.297ZM143.966 72.5408V51.4499H152.411C153.962 51.4499 155.257 51.6799 156.293 52.1399C157.33 52.5999 158.109 53.2384 158.631 54.0554C159.153 54.8655 159.414 55.7992 159.414 56.8565C159.414 57.6804 159.249 58.4047 158.919 59.0295C158.59 59.6474 158.137 60.1554 157.56 60.5536C156.99 60.9449 156.338 61.223 155.603 61.3878V61.5937C156.406 61.6281 157.158 61.8546 157.859 62.2734C158.566 62.6922 159.139 63.2792 159.578 64.0344C160.018 64.7828 160.237 65.6753 160.237 66.712C160.237 67.8311 159.959 68.83 159.403 69.7088C158.854 70.5807 158.04 71.2707 156.963 71.7787C155.885 72.2868 154.556 72.5408 152.977 72.5408H143.966ZM148.425 68.8952H152.061C153.303 68.8952 154.21 68.6584 154.779 68.1846C155.349 67.7041 155.634 67.0656 155.634 66.2692C155.634 65.6856 155.493 65.1707 155.212 64.7244C154.93 64.2782 154.529 63.928 154.007 63.674C153.492 63.42 152.878 63.2929 152.164 63.2929H148.425V68.8952ZM148.425 60.2755H151.731C152.342 60.2755 152.884 60.1691 153.358 59.9563C153.839 59.7366 154.216 59.4277 154.491 59.0295C154.772 58.6313 154.913 58.1541 154.913 57.598C154.913 56.8359 154.642 56.2215 154.1 55.7546C153.564 55.2877 152.802 55.0543 151.813 55.0543H148.425V60.2755ZM163.139 72.5408V51.4499H171.46C173.053 51.4499 174.412 51.7348 175.538 52.3047C176.671 52.8676 177.533 53.6675 178.123 54.7042C178.72 55.734 179.019 56.9458 179.019 58.3395C179.019 59.74 178.717 60.9449 178.113 61.9542C177.509 62.9565 176.633 63.7255 175.487 64.261C174.347 64.7965 172.967 65.0643 171.347 65.0643H165.775V61.4804H170.626C171.477 61.4804 172.184 61.3637 172.747 61.1303C173.31 60.8969 173.729 60.5467 174.004 60.0799C174.285 59.613 174.426 59.0329 174.426 58.3395C174.426 57.6392 174.285 57.0487 174.004 56.5682C173.729 56.0876 173.307 55.7237 172.737 55.4765C172.174 55.2225 171.463 55.0955 170.605 55.0955H167.598V72.5408H163.139ZM174.529 62.9428L179.771 72.5408H174.848L169.72 62.9428H174.529ZM201.552 61.9954C201.552 64.2953 201.116 66.252 200.244 67.8654C199.379 69.4788 198.198 70.7112 196.701 71.5625C195.211 72.4069 193.536 72.8292 191.676 72.8292C189.801 72.8292 188.119 72.4035 186.629 71.5522C185.14 70.7009 183.962 69.4685 183.097 67.8551C182.232 66.2417 181.8 64.2884 181.8 61.9954C181.8 59.6954 182.232 57.7387 183.097 56.1253C183.962 54.5119 185.14 53.283 186.629 52.4385C188.119 51.5872 189.801 51.1616 191.676 51.1616C193.536 51.1616 195.211 51.5872 196.701 52.4385C198.198 53.283 199.379 54.5119 200.244 56.1253C201.116 57.7387 201.552 59.6954 201.552 61.9954ZM197.031 61.9954C197.031 60.5055 196.808 59.2492 196.361 58.2262C195.922 57.2032 195.301 56.4274 194.497 55.8988C193.694 55.3701 192.753 55.1058 191.676 55.1058C190.598 55.1058 189.657 55.3701 188.854 55.8988C188.051 56.4274 187.426 57.2032 186.98 58.2262C186.54 59.2492 186.32 60.5055 186.32 61.9954C186.32 63.4852 186.54 64.7416 186.98 65.7645C187.426 66.7875 188.051 67.5633 188.854 68.092C189.657 68.6206 190.598 68.8849 191.676 68.8849C192.753 68.8849 193.694 68.6206 194.497 68.092C195.301 67.5633 195.922 66.7875 196.361 65.7645C196.808 64.7416 197.031 63.4852 197.031 61.9954ZM216.296 57.5156C216.214 56.6849 215.86 56.0395 215.236 55.5795C214.611 55.1195 213.763 54.8895 212.692 54.8895C211.964 54.8895 211.35 54.9925 210.848 55.1985C210.347 55.3976 209.963 55.6756 209.695 56.0326C209.434 56.3897 209.304 56.7947 209.304 57.2478C209.29 57.6255 209.369 57.955 209.541 58.2365C209.719 58.518 209.963 58.7617 210.272 58.9677C210.581 59.1668 210.938 59.3418 211.343 59.4929C211.748 59.6371 212.18 59.7606 212.64 59.8636L214.535 60.3167C215.455 60.5227 216.3 60.7973 217.069 61.1406C217.838 61.4839 218.503 61.9061 219.066 62.4073C219.629 62.9085 220.065 63.4989 220.374 64.1786C220.69 64.8583 220.852 65.6375 220.858 66.5163C220.852 67.807 220.522 68.9261 219.87 69.8736C219.224 70.8141 218.291 71.5453 217.069 72.0671C215.853 72.582 214.388 72.8395 212.671 72.8395C210.969 72.8395 209.486 72.5786 208.222 72.0568C206.966 71.535 205.984 70.7626 205.277 69.7397C204.577 68.7099 204.209 67.4363 204.175 65.919H208.49C208.538 66.6262 208.741 67.2166 209.098 67.6903C209.462 68.1572 209.946 68.5108 210.55 68.751C211.161 68.9845 211.851 69.1012 212.62 69.1012C213.375 69.1012 214.031 68.9913 214.587 68.7716C215.15 68.5519 215.586 68.2464 215.895 67.8551C216.204 67.4638 216.358 67.0141 216.358 66.506C216.358 66.0323 216.217 65.6341 215.936 65.3114C215.661 64.9887 215.256 64.7141 214.721 64.4875C214.192 64.261 213.543 64.055 212.774 63.8697L210.478 63.2929C208.7 62.8604 207.296 62.1842 206.266 61.2642C205.236 60.3442 204.724 59.105 204.731 57.5465C204.724 56.2695 205.064 55.1539 205.751 54.1996C206.444 53.2452 207.395 52.5003 208.603 51.9648C209.812 51.4293 211.185 51.1616 212.723 51.1616C214.288 51.1616 215.654 51.4293 216.821 51.9648C217.995 52.5003 218.909 53.2452 219.561 54.1996C220.213 55.1539 220.549 56.2592 220.57 57.5156H216.296Z"
                                    fill="#CB9176" />
                                <path
                                    d="M119.872 41V10.4545H138.307V13.7358H123.571V24.0568H137.352V27.3381H123.571V37.7188H138.546V41H119.872ZM161.678 18.0909C161.499 16.5795 160.774 15.4062 159.501 14.571C158.228 13.7358 156.667 13.3182 154.818 13.3182C153.465 13.3182 152.282 13.5369 151.268 13.9744C150.264 14.4119 149.478 15.0135 148.911 15.7791C148.355 16.5447 148.076 17.4148 148.076 18.3892C148.076 19.2045 148.27 19.9055 148.658 20.4922C149.056 21.0689 149.563 21.5511 150.179 21.9389C150.796 22.3168 151.442 22.63 152.118 22.8786C152.794 23.1172 153.416 23.3111 153.982 23.4602L157.085 24.2955C157.88 24.5043 158.765 24.7926 159.74 25.1605C160.724 25.5284 161.664 26.0305 162.558 26.6669C163.463 27.2933 164.209 28.0987 164.796 29.0831C165.382 30.0675 165.676 31.2756 165.676 32.7074C165.676 34.358 165.243 35.8494 164.378 37.1818C163.523 38.5142 162.27 39.5732 160.62 40.3587C158.979 41.1442 156.985 41.5369 154.639 41.5369C152.451 41.5369 150.557 41.1839 148.956 40.478C147.365 39.772 146.112 38.7876 145.198 37.5249C144.293 36.2621 143.781 34.7955 143.661 33.125H147.48C147.579 34.2784 147.967 35.233 148.643 35.9886C149.329 36.7344 150.194 37.2912 151.238 37.6591C152.292 38.017 153.426 38.196 154.639 38.196C156.051 38.196 157.318 37.9673 158.442 37.5099C159.566 37.0426 160.455 36.3963 161.112 35.571C161.768 34.7358 162.096 33.7614 162.096 32.6477C162.096 31.6335 161.813 30.8082 161.246 30.1719C160.679 29.5355 159.933 29.0185 159.009 28.6207C158.084 28.223 157.085 27.875 156.011 27.5767L152.252 26.5028C149.866 25.8168 147.977 24.8374 146.585 23.5646C145.193 22.2919 144.497 20.6264 144.497 18.5682C144.497 16.858 144.959 15.3665 145.884 14.0938C146.818 12.8111 148.071 11.8168 149.642 11.1108C151.223 10.3949 152.988 10.0369 154.937 10.0369C156.906 10.0369 158.656 10.3899 160.187 11.0959C161.718 11.7919 162.931 12.7464 163.826 13.9595C164.731 15.1726 165.208 16.5497 165.258 18.0909H161.678ZM171.757 41V10.4545H182.078C184.474 10.4545 186.433 10.8871 187.955 11.7521C189.486 12.6072 190.619 13.7656 191.355 15.2273C192.091 16.6889 192.459 18.3196 192.459 20.1193C192.459 21.919 192.091 23.5547 191.355 25.0263C190.629 26.4979 189.506 27.6712 187.984 28.5462C186.463 29.4112 184.514 29.8438 182.138 29.8438H174.74V26.5625H182.018C183.659 26.5625 184.977 26.2791 185.971 25.7124C186.965 25.1456 187.686 24.38 188.134 23.4155C188.591 22.4411 188.82 21.3423 188.82 20.1193C188.82 18.8963 188.591 17.8026 188.134 16.8381C187.686 15.8736 186.96 15.1179 185.956 14.571C184.952 14.0142 183.619 13.7358 181.959 13.7358H175.456V41H171.757ZM196.553 41H192.675L203.891 10.4545H207.709L218.925 41H215.047L205.919 15.2869H205.681L196.553 41ZM197.985 29.0682H213.615V32.3494H197.985V29.0682Z"
                                    fill="black" />
                                <path
                                    d="M27.025 59.5504C31.6653 59.5504 36.1816 60.0466 40.5739 61.0391C44.9673 62.0317 49.2861 63.5205 53.5304 65.5054V14.6494C49.6325 12.2674 45.4047 10.4213 40.8468 9.11121C36.2889 7.8011 31.6817 7.14605 27.025 7.14605C23.7334 7.14605 20.507 7.52312 17.3454 8.2775C14.1838 9.03189 11.0006 9.96468 7.79569 11.0764V62.7661C10.4809 61.6544 13.5342 60.8407 16.9556 60.3245C20.3771 59.8084 23.7334 59.5504 27.025 59.5504ZM61.3261 65.5054C65.6571 63.5205 69.9013 62.0317 74.059 61.0391C78.2167 60.0466 82.6343 59.5504 87.3117 59.5504C90.6033 59.5504 94.003 59.7886 97.511 60.265C101.019 60.7414 104.029 61.3767 106.541 62.1706V11.0764C103.596 9.72648 100.486 8.73413 97.2096 8.09885C93.9336 7.46357 90.6345 7.14605 87.3117 7.14605C82.6343 7.14605 78.1084 7.8011 73.7342 9.11121C69.36 10.4213 65.2239 12.2674 61.3261 14.6494V65.5054ZM57.4282 76.2245C53.0107 73.2072 48.2033 70.8847 43.0062 69.2571C37.8091 67.6295 32.482 66.8155 27.025 66.8155C22.521 66.8155 17.6486 67.6295 12.4081 69.2571C7.16769 70.8847 3.03166 72.5721 0 74.3189V6.19324C3.63799 4.28763 7.88749 2.77903 12.7485 1.66741C17.6096 0.555795 22.3684 0 27.025 0C32.482 0 37.7875 0.674897 42.9412 2.02471C48.095 3.37453 52.9241 5.43885 57.4282 8.21795C61.8458 5.43885 66.5882 3.37453 71.6553 2.02471C76.7225 0.674897 81.9412 0 87.3117 0C91.9683 0 96.7271 0.575663 101.588 1.72696C106.449 2.87826 110.699 4.36702 114.337 6.19324V74.3189C111.392 72.4926 107.277 70.7856 101.994 69.1975C96.7099 67.6095 91.8158 66.8155 87.3117 66.8155C81.8547 66.8155 76.6142 67.6492 71.5904 69.3166C66.5666 70.9841 61.8458 73.2867 57.4282 76.2245ZM67.5626 26.9168V21.1999C70.421 20.0882 73.3444 19.2545 76.3328 18.6988C79.3211 18.1431 82.4609 17.8651 85.7525 17.8651C88.0047 17.8651 90.2135 18.024 92.3789 18.3415C94.5443 18.659 96.6665 19.0561 98.7454 19.5325V24.773C96.6665 24.0584 94.5661 23.5224 92.4438 23.1651C90.3216 22.8078 88.0913 22.6291 85.7525 22.6291C82.4609 22.6291 79.2995 23.0062 76.2678 23.7606C73.2361 24.515 70.3345 25.5669 67.5626 26.9168ZM67.5626 53.1189V47.283C70.421 46.2111 73.3444 45.4072 76.3328 44.8712C79.3211 44.3353 82.4609 44.0673 85.7525 44.0673C88.0047 44.0673 90.2135 44.2262 92.3789 44.5437C94.5443 44.8612 96.6665 45.2583 98.7454 45.7347V50.9751C96.6665 50.2605 94.5661 49.7246 92.4438 49.3673C90.3216 49.01 88.0913 48.8313 85.7525 48.8313C82.4609 48.8313 79.2995 49.1886 76.2678 49.9032C73.2361 50.6178 70.3345 51.6897 67.5626 53.1189ZM67.5626 40.0179V34.301C70.421 33.1893 73.3444 32.3556 76.3328 31.7999C79.3211 31.2442 82.4609 30.9662 85.7525 30.9662C88.0047 30.9662 90.2135 31.1251 92.3789 31.4426C94.5443 31.7601 96.6665 32.1572 98.7454 32.6336V37.874C96.6665 37.1594 94.5661 36.6235 92.4438 36.2662C90.3216 35.9089 88.0913 35.7302 85.7525 35.7302C82.4609 35.7302 79.2995 36.1073 76.2678 36.8617C73.2361 37.6161 70.3345 38.668 67.5626 40.0179Z"
                                    fill="black" />
                            </svg>



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
