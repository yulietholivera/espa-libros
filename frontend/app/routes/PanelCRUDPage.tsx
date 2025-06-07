export function meta(): Array<{ title: string }> {
    return [{ title: "Iniciar sesión" }];
}

export default function CheckoutPage() {
    return (

        <div className="bg-regal2-espalibros">
            <div className="mx-auto max-w-4xl px-4  ">


                <main>
                    <div className="relative isolate overflow-hidden ">

                        <header className="pt-6 pb-4 sm:pb-6">
                            <img className="h-12 w-auto mt-2" src="img/image.png" alt="Your Company" />
                            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap  ">
                                <h1 className="text-2xl font-semibold text-regal-espalibros">Flujo de caja</h1>
                                <div
                                    className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">

                                </div>
                                <a href="#"
                                    className="ml-auto flex items-center gap-x-1 rounded-md bg-regal-espalibros px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-regal-espalibros focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <svg className="-ml-1.5 size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path
                                            d="M10.75 6.75a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
                                    </svg>
                                    Agregar libro
                                </a>
                            </div>
                        </header>


                        <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8">
                                    <dt className="text-sm/6 font-medium text-gray-500">Ganancia</dt>
                                    <dd className="text-xs font-medium text-gray-700">+4.75%</dd>
                                    <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                                        $405,091.00
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:border-l sm:px-6 lg:border-t-0 xl:px-8">
                                    <dt className="text-sm/6 font-medium text-gray-500">Facturas vencidas</dt>
                                    <dd className="text-xs font-medium text-rose-600">+54.02%</dd>
                                    <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">$12,787.00
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 lg:border-l xl:px-8">
                                    <dt className="text-sm/6 font-medium text-gray-500">Facturas pendientes</dt>
                                    <dd className="text-xs font-medium text-gray-700">-1.39%</dd>
                                    <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                                        $245,988.00
                                    </dd>
                                </div>
                                <div
                                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:border-l sm:px-6 lg:border-t-0 xl:px-8">
                                    <dt className="text-sm/6 font-medium text-gray-500">Gastos</dt>
                                    <dd className="text-xs font-medium text-rose-600">+10.18%</dd>
                                    <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">$30,156.00
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                            aria-hidden="true">
                            <div className="aspect-1154/678 w-288.5 bg-linear-to-br from-[#FF80B5] to-[#9089FC]"
                                style={{
                                    clipPath: 'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)'
                                }}>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-16 py-16 xl:space-y-20">

                        <div>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">Libros
                                    agregados</h2>
                            </div>
                            <div className="mt-6 overflow-hidden border-t border-gray-100">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                        <table className="w-full text-left">
                                            <thead className="sr-only">
                                                <tr>
                                                    <th>Amount</th>
                                                    <th className="hidden sm:table-cell">Client</th>
                                                    <th>More details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-sm/6 text-gray-900">
                                                    <th scope="colgroup" colSpan={3}
                                                        className="relative isolate py-2 font-semibold">
                                                        <time dateTime="2023-03-22">Hoy</time>
                                                        <div
                                                            className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50">
                                                        </div>
                                                        <div
                                                            className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50">
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td className="relative py-5 pr-6">
                                                        <div className="flex gap-x-6">
                                                            <div className="shrink-0">
                                                                <img src="img/Captura desde 2025-04-28 16-30-42.png"
                                                                    alt="Front of men&#039;s Basic Tee in black." className="w-25 " />
                                                            </div>
                                                            <div className="flex-auto">
                                                                <div className="flex items-start gap-x-3">
                                                                    <div className="text-sm/6 font-medium text-gray-900">Las vidas
                                                                        dentro de tu cabeza
                                                                    </div>
                                                                    <div
                                                                        className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                                        Paid</div>


                                                                    <p className="mt-3 text-sm text-gray-500">This durable and
                                                                        portable
                                                                        insulated tumbler
                                                                        will keep your beverage at the perfect temperature
                                                                        during
                                                                        your next adventure.
                                                                    </p>
                                                                </div>
                                                                <div className="mt-1 text-xs/5 text-gray-500">$500.00 tax</div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100">
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
                                                    </td>
                                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                                        <div className="text-sm/6 text-gray-900">Reform</div>
                                                        <div className="mt-1 text-xs/5 text-gray-500">Website redesign</div>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <div className="flex justify-end">
                                                            <a href="#"
                                                                className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">View<span
                                                                    className="hidden sm:inline"> transaction</span><span
                                                                        className="sr-only">, invoice #00012, Reform</span></a>
                                                        </div>
                                                        <div className="mt-1 text-xs/5 text-gray-500">Invoice <span
                                                            className="text-gray-900">#00012</span></div>
                                                    </td>
                                                </tr>

                                                <tr className="text-sm/6 text-gray-900">
                                                    <th scope="colgroup" colSpan={3}
                                                        className="relative isolate py-2 font-semibold">
                                                        <time dateTime="2023-03-21">Ayer</time>
                                                        <div
                                                            className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50">
                                                        </div>
                                                        <div
                                                            className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50">
                                                        </div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <td className="relative py-5 pr-6">
                                                        <div className="flex gap-x-6">
                                                            <div className="shrink-0">
                                                                <img src="img/Captura desde 2025-04-28 16-31-17.png"
                                                                    alt="Front of men&#039;s Basic Tee in black." className="w-25 " />
                                                            </div>
                                                            <div className="flex-auto">
                                                                <div className="flex items-start gap-x-3">
                                                                    <div className="text-sm/6 font-medium text-gray-900">Las vidas
                                                                        dentro de tu cabeza
                                                                    </div>
                                                                    <div
                                                                        className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                                                                        Paid</div>


                                                                    <p className="mt-3 text-sm text-gray-500">This durable and
                                                                        portable
                                                                        insulated tumbler
                                                                        will keep your beverage at the perfect temperature
                                                                        during
                                                                        your next adventure.
                                                                    </p>
                                                                </div>
                                                                <div className="mt-1 text-xs/5 text-gray-500">$500.00 tax</div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100">
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"></div>
                                                    </td>
                                                    <td className="hidden py-5 pr-6 sm:table-cell">
                                                        <div className="text-sm/6 text-gray-900">Reform</div>
                                                        <div className="mt-1 text-xs/5 text-gray-500">Website redesign</div>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <div className="flex justify-end">
                                                            <a href="#"
                                                                className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">View<span
                                                                    className="hidden sm:inline"> transaction</span><span
                                                                        className="sr-only">, invoice #00012, Reform</span></a>
                                                        </div>
                                                        <div className="mt-1 text-xs/5 text-gray-500">Invoice <span
                                                            className="text-gray-900">#00012</span></div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
                        </div>



                    </div>
                </main>


            </div>
        </div>

    );
}