export default function Card(props) {
    function modalOpen(cardId){
        props?.setOpen(true);
        fetch('http://challenge.vole.io/cards/'+cardId)
          .then(response => response.json())
          .then(data => props?.setSelectedCard(data));   
      }
  return (
    <>
      {props.myCards.map((card) => (
        <div
          className="h-[346px] rounded-lg w-[200px] bg-white m-2 drop-shadow-md cursor-pointer"
          key={card.id}
          onClick={() => modalOpen(card.id)}
        >
          <div className="flex flex-row h-5/6 w-full bg-white rounded-t-lg">
            <img src={card.photoUrl}></img>
          </div>
          <div className="flex flex-row justify-center items-center m-2">
            <div className=" flex h-8 w-16 m-auto">€ {card.price + ".00"}</div>
            <div className=" flex h-8 rounded-lg border-[1px] border-[#E8282B] w-16 m-auto">
              <p className="text-[#E8282B] m-auto cursor-pointer">Sell</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
