import { useEffect, useState, useRef } from 'react'
import Card from '../components/card'
import CardModal from './cardModal'
import Pagination from './pagination'
import { selectPaginate } from './paginateSlice';
import { useSelector } from 'react-redux';
import Filter from '../components/filter'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MarketCards() {
  const [myCards, setMyCards] = useState([]);
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [selectedCard, setSelectedCard] = useState();
  const [cardsPerPage] = useState(8);
  const currentPage = useSelector(selectPaginate);

  useEffect(()=>{
    fetch('http://challenge.vole.io/cards/market')
        .then(response => response.json())
        .then(data => setMyCards(data));
  },[])

  const indexOfLastPost = currentPage * cardsPerPage;
  const indexOfFirstPost = indexOfLastPost - cardsPerPage;
  const currentCards = myCards.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-gray-100 m-16 rounded-lg">
      <div>
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
              <Filter></Filter>
              <div className="lg:col-span-3 flex flex-wrap">
                <Card myCards={currentCards} setOpen={setOpen} setSelectedCard={setSelectedCard}></Card>
                {
                  open ? 
                  <CardModal selectedCard={selectedCard} setOpen={setOpen} open={open} setSelectedCard={setSelectedCard}></CardModal>
                  : 
                  ''
                }
                <div className='w-full m-1'>
                  <Pagination  cardsPerPage={cardsPerPage} totalMarketCards={myCards.length} />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}