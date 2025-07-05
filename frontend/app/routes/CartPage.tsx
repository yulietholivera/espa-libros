import Logo from './../assets/logo.svg';
import { Link } from "react-router";
export function meta(): Array<{ title: string }> {
  return [{ title: "CartPage" }];
}

export default function CartPage() {
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
                <h2 className="text-2xl font-bold tracking-tight text-gray-400 underline mt-2">Carrito de compras
                </h2>
            </div>
           



       

            <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:px-0">
    

    <form className="mt-2">
      <section aria-labelledby="cart-heading">
        <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
          <li className="flex py-6">
            <div className="group relative mb-5">
                    <div className="w-full h-55 overflow-hidden bg-gray-200 group-hover:opacity-75">
                        <img src="img/Captura desde 2025-04-28 16-30-42.png"
                            alt="Hand stitched, orange leather long wallet." className="w-full h-full object-cover"/>
                </div>
                    
                </div>

            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
              <div>
                <div className="flex justify-between">
                  <h4 className="text-sm">
                    <a href="#" className="font-medium text-gray-700 hover:text-gray-800">Artwork Tee</a>
                  </h4>
                  <p className="ml-4 text-sm font-medium text-gray-900">$32.00</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Mint</p>
                <p className="mt-1 text-sm text-gray-500">Medium</p>
              </div>

              <div className="mt-4 flex flex-1 items-end justify-between">
                <p className="flex items-center space-x-2 text-sm text-gray-700">
                  <svg className="size-5 shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                  </svg>
                  <span>In stock</span>
                </p>
                <div className="ml-4">
                  <button type="button" className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Eliminar
                                            </button>
                </div>
              </div>
            </div>
          </li>
          <li className="flex py-6">
            <div className="group relative mb-5">
                    <div className="w-full h-55 overflow-hidden bg-gray-200 group-hover:opacity-75">
                        <img src="img/Captura desde 2025-04-28 16-31-17.png"
                            alt="Hand stitched, orange leather long wallet." className="w-full h-full object-cover"/>
                    </div>
                    
                </div>

            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
              <div>
                <div className="flex justify-between">
                  <h4 className="text-sm">
                    <a href="#" className="font-medium text-gray-700 hover:text-gray-800">Basic Tee</a>
                  </h4>
                  <p className="ml-4 text-sm font-medium text-gray-900">$32.00</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Charcoal</p>
                <p className="mt-1 text-sm text-gray-500">Large</p>
              </div>

              <div className="mt-4 flex flex-1 items-end justify-between">
                <p className="flex items-center space-x-2 text-sm text-gray-700">
                  <svg className="size-5 shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clip-rule="evenodd" />
                  </svg>
                  <span>Will ship in 7-8 years</span>
                </p>
                <div className="ml-4">
                  <button type="button" className="rounded-sm bg-regal-espalibros px-2 py-1 text-xs font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                Eliminar
                                            </button>
                  
                </div>
              </div>
            </div>
          </li>

          
        </ul>
      </section>

      
      <section aria-labelledby="summary-heading" className="mt-10">
        <h2 id="summary-heading" className="sr-only">Order summary</h2>

        <div>
          <dl className="space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-base font-medium text-gray-900">Subtotal</dt>
              <dd className="ml-4 text-base font-medium text-gray-900">$96.00</dd>
            </div>
          </dl>
          <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
        </div>

        <div className="mt-10">
          <button type="submit" className="w-full rounded-md border border-transparent bg-regal-espalibros px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden">Checkout</button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p>
            O
            <a href="#" className="font-medium text-gray-900 hover:text-indigo-gray">
              Seguir comprando
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </section>
    </form>
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