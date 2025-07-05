// /webapps/espa-libros/frontend/app/routes/BookDetailPage.tsx
import { Link } from "react-router";
import Logo from './../assets/logo.svg';

export function meta(): Array<{ title: string }> {
    return [{ title: "Iniciar sesión" }];
}

export default function BookDetailPage() {
    return (
        <>
            <div className="bg-regal2-espalibros pb-96">
                <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-4xl lg:px-8">
                    <div className="mb-2">
                        <Link to="/">
                                <img src={Logo} alt="Espa-Libros Logo" />
                            </Link>
                    </div>
                    <div className="md:flex md:items-center md:justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">Detalle del libro
                        </h2>
                    </div>



                    <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0 mt-10">
                        <div className="flex sm:items-baseline sm:space-x-4">
                            <h1 className="text-2xl font-bold tracking-tight text-regal-espalibros sm:text-3xl">
                                Order #54879</h1>
                            <a href="#" className="hidden text-sm font-medium text-gray-600 hover:text-indigo-500 sm:block">
                                Ver factura
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                        <p className="text-sm text-gray-600">Pedido realizado <time dateTime="2021-03-22"
                            className="font-medium text-gray-900">March 22, 2021</time></p>
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden">
                            Ver factura
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>

                    <section aria-labelledby="products-heading" className="mt-6">
                        <h2 id="products-heading" className="sr-only">Products purchased</h2>
                        <div className="space-y-8">
                            <div className="border-t border-b border-gray-200 bg-white shadow-xs sm:rounded-lg sm:border">
                                <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                                    <div className="sm:flex lg:col-span-7">
                                        <img src="img/Captura desde 2025-04-28 16-30-42.png"
                                            alt="Insulated bottle with white base and black snap lid."
                                            className=" w-full object-cover sm:size-40" />

                                        <div className="mt-6 sm:mt-0 sm:ml-6">
                                            <h3 className="text-base font-medium text-gray-900">
                                                <a href="#">Nomad Tumbler</a>
                                            </h3>
                                            <p className="mt-2 text-sm font-medium text-gray-900">$35.00</p>
                                            <p className="mt-3 text-sm text-gray-500">This durable and portable insulated tumbler
                                                will keep your beverage at the perfect temperature during your next adventure.
                                            </p>
                                        </div>
                                    </div>


                                    <div className="mt-6 lg:col-span-5 lg:mt-0">
                                        <dl className="grid grid-cols-2 gap-x-6 text-sm">
                                            <div>
                                                <dt className="font-medium text-gray-900">Delivery address</dt>
                                                <dd className="mt-3 text-gray-500">
                                                    <span className="block">Floyd Miles</span>
                                                    <span className="block">7363 Cynthia Pass</span>
                                                    <span className="block">Toronto, ON N3Y 4H8</span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-gray-900">Shipping updates</dt>
                                                <dd className="mt-3 space-y-3 text-gray-500">
                                                    <p>f•••@example.com</p>
                                                    <p>1•••••••••40</p>
                                                    <button type="button"
                                                        className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                        Editar
                                                    </button>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </section>
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