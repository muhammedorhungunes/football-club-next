import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

export default function CardModal(props) {
    const cancelButtonRef = useRef(null)

    function closeModal(){
        props.setOpen(false);
    }
  return (
    <>
      <Transition.Root show={props?.open} as={Fragment} className="">
        <Dialog
          as="div"
          className="relative z-10 "
          initialFocus={cancelButtonRef}
          onClose={props?.setOpen}
        >
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
                    <div
                      className={
                        props?.selectedCard?.cardType === "Gold"
                          ? "bg-gradient-to-t from-[#A3873C] to-[#E3D294] flex items-center justify-center  w-[914px] h-[382px] relative"
                          : props?.selectedCard?.cardType === "Silver"
                          ? "bg-gradient-to-t from-[#808080] to-[#DFDFDF] flex items-center justify-center  w-[914px] h-[382px] relative"
                          : props?.selectedCard?.cardType === "Bronze"
                          ? "bg-gradient-to-t from-[#9C6D3E] to-[#E8C8A9] flex items-center justify-center  w-[914px] h-[382px] relative"
                          : ""
                      }
                    >
                      <div className="w-[200px] h-[200px] ">
                        <img src={props?.selectedCard?.photoUrl}></img>
                      </div>
                      <div
                        className="flex bg-gray-500 w-10 h-10 items-center justify-center rounded-lg absolute top-4 left-[840px] cursor-pointer"
                        onClick={() => closeModal()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-row w-full h-[144px]">
                      <div className="grid grid-cols-1 w-1/4 h-[96px] rounded m-10">
                        <div className="w-full">
                          <p className="text-red-500 text-xl">
                            {props?.selectedCard?.name}
                          </p>
                        </div>
                        <div className="w-full text-xs ">
                          <p>{props?.selectedCard?.position}</p>
                        </div>
                      </div>
                      <div className="flex bg-gray-100 w-1/2 h-[96px] rounded m-10 ">
                        <p className="flex items-center justify-center m-auto">
                          € {props?.selectedCard?.price + ".00"}
                        </p>
                        <div className="bg-red-500 rounded-lg flex items-center justify-center w-1/2 h-10 m-auto">
                          <p className="flex justify-center items-center m-auto text-white">
                            Sell
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full h-[220px] items-center justify-center ">
                      <div className="w-11/12 h-3/4 bg-gray-100 rounded-lg ">
                        <div className="flex flex-row">
                          <p className="ml-4 mt-2">Attributes</p>
                        </div>
                        <div className="flex flex-row justify-center items-center">
                          <div className="w-[118px] h-[96px] bg-white ml-4 rounded-lg">
                            <p className="">Pace</p>
                            <p>{props?.selectedCard?.attributes.pace + "/100"}</p>
                          </div>
                          <div className="w-[118px] h-[96px] bg-white ml-4 rounded-lg">
                            <p>Shooting</p>
                            <p>{props?.selectedCard?.attributes.shooting + "/100"}</p>
                          </div>
                          <div className="w-[118px] h-[96px] bg-white ml-4 rounded-lg">
                            <p>Passing</p>
                            <p>{props?.selectedCard?.attributes.passing + "/100"}</p>
                          </div>
                          <div className="w-[118px] h-[96px] bg-white ml-4 rounded-lg">
                            <p>Dribbling</p>
                            <p>{props?.selectedCard?.attributes.dribbling + "/100"}</p>
                          </div>
                          <div className="w-[118px] h-[96px] bg-white ml-4 rounded-lg">
                            <p>Defending</p>
                            <p>{props?.selectedCard?.attributes.defending + "/100"}</p>
                          </div>
                          <div className="w-[118px] h-[96px] bg-white ml-2 rounded-lg">
                            <p>Physical</p>
                            <p className="font-bold">
                              {props?.selectedCard?.attributes.physical + "/100"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-11/12 h-3/4 ml-10">
                      <div className="bg-gray-100 w-[421px] h-[96px] rounded-lg">
                        <div className="m-4 text-sm">
                          <p>Team</p>
                          <p className="text-lg font-bold">
                            {props?.selectedCard?.team}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-100 w-[421px] h-[96px] rounded-lg ml-2">
                        <div className="m-4 text-sm">
                          <p>Card type</p>
                          <p className="text-lg font-bold">
                            {props?.selectedCard?.cardType}
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
    </>
  );
}
