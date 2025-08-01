// frontend/app/components/home/HomeHeader.tsx
import { Link } from "react-router";
import Logo from "~/assets/logo.svg";
import { useCart } from "~/context/CartContext"; // 👈 1. Importa el hook del carrito

export default function HomeHeader() {
   const { totalItems } = useCart(); // 👈 2. Obtén el número total de items
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Espa-Libros Logo" className="h-14" />
        </Link>

        {/* Navegación: carrito, panel CRUD, login */}
        <nav className="flex space-x-4">
          {/* Carrito */}
           <Link to="/carrito" aria-label="Ver carrito" className="relative"> {/* 👈 3. Haz el contenedor relativo */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ... tu código SVG del carrito ... */}
              <rect width="48" height="48" fill="url(#pattern-cart)" />
              <defs>
                <pattern id="pattern-cart" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image-cart" transform="scale(0.0208333)" />
                </pattern>
                <image id="image-cart" width="48" height="48" preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADGElEQVR4Ae3BP2hUdwAA4O/9kkHkBguROhSaQSRgoIEWclAhD3rgbS5dpEuGgBTERRcJkhQdAurmYCHgUoSCoxSHB71AhhMcKiicVOEcKhYC3hBCIAEb+AUSvT/vLrW5O+j3JXiv2Y+4awgEraWGROJDJ/EnGvjMEAg+9BKvcQzfGAJBs0xUMgSCZpkoNQSCZploBkcMuKDZGp7iCIoGXNDaI1HZgAtaq4hSA25Ua6vYxDSOoWHPe4PjeNDaOh6LSgZTA2uj2sswgxIe2JPorxS/44UdQXuZaMZgmRT9YUfQ3hM0MIFxg2NCVLMjaG8bK6LU4JgSvbQj6OyRqGwwjOIr0aodQWcV0YzBMIkCXqBhR9BZDX/hBKb03xlR1a4gXyYq6b+i6IldQb5MVNJ/Z0WZXUG+TPQtRvVPEWN4jZpdQb63eI4CzuifsuihfYLuZKJU/5wTPbRP0J1HorL+mMAUGqjYJ+jOKrbxNQoO36zoV2zaJ+jOOh5jFCWHaxQ/iH7xkaB7majkcJXxBV5h1UeC7mWi7xyui6K7Wgi6V8U6JnDC4ZjCWWxiWQtB97axIio7HIuin9HQQtCbTJT6753BOWxiSRsjetPARZzECDbwxqdVxCxuooCf8Js2Er17htP2rKOGZ3iOGtZRF61jTTSGgmgcBUzgNCYxgYI9T1HEpjYSB1PC9yjjS5/WK2R4gEyOxL83hiImMY6TGMMxfI4jPrSJv9HAW9RRxzNUseZ/QyRxcCkuoyiq4jYqepPiMoqiKm6joguJg1nEgtau4YbuLGJBa9dwQ44RvUtxD9uYx3ncxDukKGEFdZ2luIdtzOM8buIdUpSwgroORvTuDk5hHkvYwAZWsYUSjuO+zu7gFOaxhA1sYBVbKOE47usg6N20aFmzZdG0fNOiZc2WRdNyBL1L5EvkS+RL5Ah6VxXNaTYnqspXFc1pNieqyjGid28wixRbqOEoLuE6Ai6grrM3mEWKLdRwFJdwHQEXUNdB4mAWsaC1q1jSnUUsaO0qluRIHFyKKyiKqriFit6kuIKiqIpbqOjCP8N7run6DvR6AAAAAElFTkSuQmCC" />
              </defs>
            </svg>
            
            {/* 👈 4. Añade el globo (badge) aquí */}
            {totalItems > 0 && (
              <span 
                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Panel CRUD */}
          <Link to="/panel-crud" aria-label="Panel CRUD">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="url(#pattern-panel)" />
              <defs>
                <pattern id="pattern-panel" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image-panel" transform="scale(0.0208333)" />
                </pattern>
                <image id="image-panel" width="48" height="48" preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADb0lEQVR4Ae3BT2jVdQAA8M/79T1M2GHQwlEaAw3eYYdB89SkCQsXCE2YVCR0UXjHDkaGgo2MCAmTLTQ8aDhR2KACQQ8DFz5okYLDRR40Rk140oIdHvQOKxO+wny8v9seugd+Pp55ylKKdaDF+pbHgkdSok6Mo0dzyOJdzKdEV7ATefxtfXserchiexDtFG3GovWtHX+h10OJYovWvwWPSTS5xPrWjkFVBCuXxja8iN/xE+atzCBuYk5lbbiGNLYjq4ygfu/gCNJKZfExsmr7AMexiD2YVCpgHGnM4LoKErUFnMYFpHEff4hmkUcvruKg6npwTNSGy8goNYJ+5LALBRUkahvBPuSxH5twVfQlXsAXos+RUV4bxhFwAsMIOImTCKIMMihgN+ZVEVQ3gAzyeBNZpQo4iFmcwwgmcUexM+jEDRzAEu7gNDLYim8wItqPaTUkqjssGkZWdWP4FgEHFGvHIBYxhCXRGHYgh36MI+AzjKlDorI2vIYCRtXnK9Fbii3gDWzHnGLT2IYZ0Q84rE5BZV2iGygo7yO8r1QHWpG3bFJl8+jFAC5ZgaCyIFpSal6URlp5WzCjfnlMWKGgskXRRqWOYlKpFlwWzaisHWdwHhetQVDZLBaRRhq3LStgSqkh0c+q68IubMBFa5CobAnnRSNqa8WnojH1CaJu3EK/FUpUdxQL6MdJBOW1Yhxp/IpTirXgGkaVN4gu9Ir24jd0qSFRXQ57UEAGv2AvOkSdyOAWBpDDIJYU60AvdqlPP9LoUUNQ2xR2YBzdOKe8GxjCnCcoqM80XsE+DCGNjbiHm7iIMU9BUL8CRjFq5XKYwbRoDndxSTSFfbgpmkI/rqsheDIK6LZsDlstm8Imy87irDokmlyiyQXF+jSZoNhVTSYo9qPm8LpHgmJ9msMDjySaXKL5BI8Jont4Cd9hxvr2quiuh1KiQVxAi+awhN24lLKsEwPosHoBh0TDih0RDVubHKZw20PBsjmcsjZdOIS7+ESxvdiCCcxqkERjDYiySk2LBjRQorHeE11R6orobQ2UaJw+dCOH75WaQA496NMgicZowYjoBApKFfC16DhaNEDK6g3hmKgV7XiAP/Gf8hJsRgoLyIs+xIRVCFYvjU7FUnhZfdrRLtpqlVLWplP0HDYgrz6t+Af/iuY806T+BzBzyJlh+HqwAAAAAElFTkSuQmCC" />
              </defs>
            </svg>
          </Link>

          {/* Login */}
          <Link to="/login" aria-label="Iniciar sesión">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="url(#pattern-login)" />
              <defs>
                <pattern id="pattern-login" patternContentUnits="objectBoundingBox" width="1" height="1">
                  <use xlinkHref="#image-login" transform="scale(0.0208333)" />
                </pattern>
                <image id="image-login" width="48" height="48" preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAExUlEQVR4Ae3BUWhdZwEA4O/ee5ApV+lD6A5asLiAB9OH2JXiQw0eGKW2Eco8hFtaXdA5HRahyKZFsBT1aXvYQ0FkioN2nIzuRhkbWtm4m1UIGlkqtR7kTjKZ5QxSzSBikUOxcAJ/r6mpSG4awe/zf3dZw9YW4TiOoo15nMRbVjVsXRFyZAYt4aN4y00tW1OEHBlKfAqPYQzjuBezbmraeiLkyFAixatYwrTaHquatpYIOTKUSFEIdqmtWNW0dUTIkaFEikKQIFc7Z1XT1hAhR4YSKQpBgh5idHHGqoa7L0KODCVSFIIEPcToooPKqqa7K0KODCVSFAY9iRh9dFC5RcvdEyFHhhIpCmv9CVOI8T5ccIuWuyNCjgwlUhSCUTyCBfRxEVOYwDZcsKpl80XIkaFEikKQ4DUcxgTOo4+LmMIEtuGCm1o2V4QcGUqkKAQJeohxHR/CBM6jj4uYwgTei5+1bJ4IOTKUSFEIRvEaYnRxCAexGxM4jz4+gL3Yje+0bI4IOTKUSFEY9FlkqHAEfXQxid2YwL04iQpHcaVl+CLkyFAiRWGteYxhFx7ES1hEF5PYjQdQ4Qied1PLcEXIkaFEikKQ4Cz+hiuYxRj2IsNLWEQXk9iGI3jeqpbhiZAjQ4kUhSBBD+PI8HtcxizGsBcZnsNVPIuz+LlbNA1HhBwZSqQoBAl6iHEJEXJkqDCnFiNWW0bhX7RsvAg5MpRIUQgS9BCji/34Kw7iQdyHx9ROYNY6WjZWhBwZSqQoBAl6iNFFBxXm8A4OYlztBJ5yBy0bJ0KODCVSFIIEPcToooNKMId38AC+iqf8BxrWF2ESh7APidoy+ijwPcwhR4YSKQpBgh5idNFBZQM0/HvT+AZG3dkSRlAiRSFI0EOMLjqobJCGtdr4ITK1S5jBT3EZFUawEwfwZcQokaIQJOghRhcdVDZQw6A2foJ9WMajmLG+CJNYwKIgQQ8xuuigssEaBp1HhkWkWPTfSdBDjC46qAxBJDiGDMv4JBYNijCONlawgMpaO9FDjC46qAxJpHYPnlA7gcKg4ziFEcESTuOMQeOIsYwOKkPUUsswjUv4kkE5Hsd78DZ+g3djOw5iFD8S9HEU78ev8QdD1FL7NhKcxrzgOB7HCh7CNJ7Bk3gD+7EH1/ArtRt4F/bj73jBEDXV7ld7WRDhlNoXMGPQOTyqdsqgl9X2GbKm2g61vmAcI3gbM27vHK5hBHsEC2r3GbKm4LpBbbXC+i6rta0VGbImIrXIoBW1D1vfmNqKoK123ZA1UeHPiDAqWMASYnTc3jGMYAnzglG1Nw1ZU21O7ROCCqfVnsYxg47hu2qnDTqg9gtDFqn9GJ/GQ/i+4Aw+hqM4iydQIEGs9izOCCJ8Xu1FQ9ZS+yM+h4/gd7gimMU17MV27EQbS/gavm7QFB7BG/gKbhiihuBhPI0SH0ffoAjjaGMF89Yaxeto4zM4Z8hagt/ifuzGflzAXwQ3cBWLuGqtBK9gBM/hmzZBS3ADL+AQdmEKb+KKO5vGeWzHLzGFf9gEDWu1MYNDanP4AV5FX7ATB/BFjKt1MY0Vm6Th9iJM41uIBRVK7DCoxEk8Y5M1rK+NwziMPfigYAmv4EXMoPI/4B7ssIX8E25DQ1oamg57AAAAAElFTkSuQmCC" />
              </defs>
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}
