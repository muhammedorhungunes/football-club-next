import { Fragment, useEffect, useState, useRef } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon, ArrowLongUpIcon , ArrowLongDownIcon} from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [myCards, setMyCards] = useState([]);
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [selectedCard, setSelectedCard] = useState();

  useEffect(()=>{
    fetch('http://challenge.vole.io/cards/market')
        .then(response => response.json())
        .then(data => setMyCards(data));
  },[])

  function modalOpen(cardId){
    setOpen(true);
    fetch('http://challenge.vole.io/cards/'+cardId)
      .then(response => response.json())
      .then(data => setSelectedCard(data));       
  }

  function closeModal(){
    setOpen(false);
  }

  return (
    <div className="bg-gray-100 m-16 rounded-lg">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6 bg-white">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Market</h1>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block rounded-lg">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6 bg-white rounded-lg">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900 ml-8">{section.name}</span>
                            <span className="flex items-center mr-8">
                              {open ? (
                                <ArrowLongUpIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ArrowLongDownIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center ml-8">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              <div className="lg:col-span-3 flex flex-wrap">
                {myCards.map((card) => (
                  <div className="h-[346px] rounded-lg w-[200px] bg-white m-2 drop-shadow-md cursor-pointer" key={card.id} onClick={()=> modalOpen(card.id)} >
                    <div className='flex flex-row h-5/6 w-full bg-white rounded-t-lg'>
                      <img src={card.photoUrl}></img>
                    </div>
                    <div className='flex flex-row justify-center items-center m-2'>
                      <div className=' flex h-8 w-16 m-auto' >
                        € {card.price + '.00'}
                      </div>
                      <div className=' flex h-8 rounded-lg border-[1px] border-[#E8282B] w-16 m-auto' >
                        <p className='text-[#E8282B] m-auto cursor-pointer'>
                          Buy
                        </p>
                      </div>
                    </div>
                  </div>  
                ))}
                {
                  open ? 
                  <Transition.Root show={open} as={Fragment} className=''>
                    <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setOpen}>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl w-[914px] h-[860px]">
                              <div className="bg-white">
                                <div className={selectedCard?.cardType === 'Gold' ? 'bg-gradient-to-t from-[#A3873C] to-[#E3D294] flex items-center justify-center  w-[914px] h-[382px] relative' : selectedCard?.cardType === 'Silver' ? 'bg-gradient-to-t from-[#808080] to-[#DFDFDF] flex items-center justify-center  w-[914px] h-[382px] relative' : selectedCard?.cardType === 'Bronze' ? 'bg-gradient-to-t from-[#9C6D3E] to-[#E8C8A9] flex items-center justify-center  w-[914px] h-[382px] relative' : '' }>
                                  <div className='w-[200px] h-[200px] '>
                                    <img  src={selectedCard?.photoUrl}></img>
                                  </div>
                                  <div className='flex bg-gray-500 w-10 h-10 items-center justify-center rounded-lg absolute top-4 left-[840px] cursor-pointer' onClick={()=> closeModal()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </div>
                                </div>
                                <div className='flex flex-row w-full h-[144px]'>
                                  <div className='grid grid-cols-1 w-1/4 h-[96px] rounded m-10'>
                                    <div className='w-full'>
                                      <p className='text-red-500 text-xl'>
                                        {selectedCard?.name}
                                      </p>
                                    </div>
                                    <div className='w-full text-xs '>
                                      <p>
                                        {selectedCard?.position}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='flex bg-gray-100 w-1/2 h-[96px] rounded m-10 '>
                                    <p className='flex items-center justify-center m-auto'>
                                      € {selectedCard?.price + '.00'} 
                                    </p>
                                    <div className='bg-red-500 rounded-lg flex items-center justify-center w-1/2 h-10 m-auto'>
                                      <p className='flex justify-center items-center m-auto text-white'>
                                        Sell
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-row w-full h-[220px] items-center justify-center '>
                                  <div className='w-11/12 h-3/4 bg-gray-100 rounded-lg '>
                                    <div className='flex flex-row'>
                                      <p className='ml-4 mt-2'>
                                        Attributes
                                      </p>
                                    </div>
                                    <div className='flex flex-row justify-center items-center'>
                                      <div className='w-[118px] h-[96px] bg-white ml-4 rounded-lg'>
                                        <p className=''>
                                          Pace
                                        </p>
                                        <p>
                                          {selectedCard?.attributes.pace + '/100'}
                                        </p>
                                      </div>
                                      <div className='w-[118px] h-[96px] bg-white ml-4 rounded-lg'>
                                        <p>
                                          Shooting
                                        </p>
                                        <p>
                                          {selectedCard?.attributes.shooting + '/100'}
                                        </p>
                                      </div>
                                      <div className='w-[118px] h-[96px] bg-white ml-4 rounded-lg'>
                                        <p>
                                          Passing
                                        </p>
                                        <p>
                                          {selectedCard?.attributes.passing + '/100'}
                                        </p>
                                      </div>
                                      <div className='w-[118px] h-[96px] bg-white ml-4 rounded-lg'>
                                        <p>
                                          Dribbling
                                        </p>
                                        <p>
                                          {selectedCard?.attributes.dribbling + '/100'}
                                        </p>
                                      </div>
                                      <div className='w-[118px] h-[96px] bg-white ml-4 rounded-lg'>
                                        <p>
                                          Defending
                                        </p>
                                        <p>
                                          {selectedCard?.attributes.defending + '/100'}
                                        </p>
                                      </div>
                                      <div className='w-[118px] h-[96px] bg-white ml-2 rounded-lg'>
                                        <p>
                                          Physical
                                        </p>
                                        <p className='font-bold'>
                                          {selectedCard?.attributes.physical + '/100'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-row w-11/12 h-3/4 ml-10'>
                                  <div className='bg-gray-100 w-[421px] h-[96px] rounded-lg'>
                                    <div className='m-4 text-sm'>
                                      <p>
                                        Team
                                      </p>
                                      <p className='text-lg font-bold'>
                                        {selectedCard?.team}
                                      </p>
                                    </div>
                                  </div>
                                  <div className='bg-gray-100 w-[421px] h-[96px] rounded-lg ml-2'>
                                    <div className='m-4 text-sm'>
                                    <p>
                                      Card type
                                    </p>
                                    <p className='text-lg font-bold'>
                                       {selectedCard?.cardType}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root> 
                  : 
                  ''
                }
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}