// /webapps/espa-libros/frontend/app/routes/CheckoutPage.tsx
import Logo from '../../assets/logo.svg'
import { Link } from "react-router";
export function meta(): Array<{ title: string }> {
    return [{ title: "Iniciar sesión" }];
}

export default function CheckoutPage() {
    return (
        <>
            <div className="bg-regal2-espalibros">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                    <div className="mb-2">
                        <Link to="/">
                                <img src={Logo} alt="Espa-Libros Logo" />
                            </Link>
                    </div>
                    <div className="md:flex md:items-center md:justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">Compra tu libro
                        </h2>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6  md:gap-y-0 lg:gap-x-8">
                        <div className="group relative mb-5">
                            <div className=" border-t border-gray-200 ">
                                <h2 className="text-lg font-medium text-gray-900">Método de entrega</h2>
                                <fieldset aria-label="Método de entrega" className="mt-4">
                                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                                        <label aria-label="Estándar" aria-description="4–10 días hábiles for $5.00"
                                            className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-xs focus:outline-hidden">
                                            <input type="radio" name="delivery-method" value="Estándar" className="sr-only" />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">Estándar</span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">4–10 días
                                                        hábiles</span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">$5.00</span>
                                                </span>
                                            </span>

                                            <svg className="size-5 text-regal-espalibros" viewBox="0 0 20 20" fill="currentColor"
                                                aria-hidden="true" data-slot="icon">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2"
                                                aria-hidden="true"></span>
                                        </label>
                                        <label aria-label="Express" aria-description="2–5 días hábiles for $16.00"
                                            className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-xs focus:outline-hidden">
                                            <input type="radio" name="delivery-method" value="Express" className="sr-only" />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">Express</span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">2–5 días
                                                        hábiles</span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">$16.00</span>
                                                </span>
                                            </span>

                                            <svg className="size-5 text-regal-espalibros" viewBox="0 0 20 20" fill="currentColor"
                                                aria-hidden="true" data-slot="icon">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                                    clip-rule="evenodd" />
                                            </svg>

                                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2"
                                                aria-hidden="true"></span>
                                        </label>
                                    </div>
                                </fieldset>
                            </div>


                            <div className="mt-10 border-t border-gray-200 pt-10">
                                <h2 className="text-lg font-medium text-gray-900">Pago</h2>

                                <fieldset className="mt-4">
                                    <legend className="sr-only">Forma de pago</legend>
                                    <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                        <div className="flex items-center">
                                            <input id="credit-card" name="payment-type" type="radio" checked
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-regal-espalibros checked:bg-regal-espalibros focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                            <label htmlFor="credit-card"
                                                className="ml-3 block text-sm/6 font-medium text-gray-700">Tarjeta de
                                                crédito</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input id="paypal" name="payment-type" type="radio"
                                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-regal-espalibros checked:bg-regal-espalibros focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                            <label htmlFor="paypal"
                                                className="ml-3 block text-sm/6 font-medium text-gray-700">PayPal</label>
                                        </div>

                                    </div>
                                </fieldset>

                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="col-span-4">
                                        <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">Número de
                                            tarjeta</label>
                                        <div className="mt-2">
                                            <input type="text" id="card-number" name="card-number" autoComplete="cc-number"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div className="col-span-4">
                                        <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">Nombre en la
                                            tarjeta</label>
                                        <div className="mt-2">
                                            <input type="text" id="name-on-card" name="name-on-card" autoComplete="cc-name"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div className="col-span-3">
                                        <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">Fecha de
                                            expiración (MM/YY)</label>
                                        <div className="mt-2">
                                            <input type="text" name="expiration-date" id="expiration-date" autoComplete="cc-exp"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">CVC</label>
                                        <div className="mt-2">
                                            <input type="text" name="cvc" id="cvc" autoComplete="csc"
                                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group relative mb-5">

                            <div className="mt-10 lg:mt-0">
                                <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>

                                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
                                    <h3 className="sr-only">Items in your cart</h3>
                                    <ul role="list" className="divide-y divide-gray-200">
                                        <li className="flex px-4 py-6 sm:px-6">
                                            <div className="shrink-0">
                                                <img src="img/Captura desde 2025-04-28 16-30-42.png"
                                                    alt="Front of men&#039;s Basic Tee in black." className="w-25 rounded-md" />
                                            </div>

                                            <div className="ml-6 flex flex-1 flex-col">
                                                <div className="flex">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="text-sm">
                                                            <a href="#"
                                                                className="font-medium text-gray-700 hover:text-gray-800">Pasta
                                                                dura</a>
                                                        </h4>
                                                        <p className="mt-1 text-sm text-gray-500">Negra</p>
                                                        <p className="mt-1 text-sm text-gray-500">Grande</p>
                                                    </div>

                                                    <div className="ml-4 flow-root shrink-0">
                                                        <button type="button"
                                                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                                                            <span className="sr-only">Remove</span>
                                                            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor"
                                                                aria-hidden="true" data-slot="icon">
                                                                <path fill-rule="evenodd"
                                                                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                                                                    clip-rule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-1 items-end justify-between pt-2">
                                                    <p className="mt-1 text-sm font-medium text-gray-900">$32.00</p>

                                                    <div className="ml-4 grid grid-cols-1">
                                                        <select id="quantity" name="quantity" aria-label="Quantity"
                                                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-regal-espalibros sm:text-sm/6">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                        </select>
                                                        <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 sm:size-4"
                                                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                                            data-slot="icon">
                                                            <path fill-rule="evenodd"
                                                                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                                                clip-rule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>


                                    </ul>
                                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm">Total parcial</dt>
                                            <dd className="text-sm font-medium text-gray-900">$64.00</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm">Envío</dt>
                                            <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm">Impuestos</dt>
                                            <dd className="text-sm font-medium text-gray-900">$5.52</dd>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                            <dt className="text-base font-medium">Total</dt>
                                            <dd className="text-base font-medium text-gray-900">$75.52</dd>
                                        </div>
                                    </dl>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <button type="submit"
                                            className="w-full rounded-md border border-transparent bg-regal-espalibros px-4 py-3 text-base font-medium text-white shadow-xs hover:regal-espalibros focus:ring-2 focus:ring-regal-espalibros focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">Confirmar
                                            pedido</button>
                                    </div>
                                </div>
                            </div>
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

        </>
    );
}