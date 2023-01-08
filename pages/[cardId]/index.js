//import { NextPage } from "next";
import { Fragment } from "react";
import CardDetail from "../../components/cardDetail";


const CardDetails = (props) => {
  return (
    <Fragment>
      
      <CardDetail
      />
    </Fragment>
  );
};

export async function getStaticPaths() {

    //const cardId = context.params.cardId.toString();
    const res = await fetch('http://challenge.vole.io/cards/mycards')
    const myCards = await res.json()

  return {
    fallback: false,
    paths: myCards.map((card) => ({
      params: { cardId: card.id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const cardId = context.params.cardId.toString();

  const res = await fetch(`http://challenge.vole.io/cards/`+cardId)
  const card = await res.json()
//   const selectedCountry = countries.filter((country)=> {
//     return country.cca3 === countryCca3;
//   })

  return {
    props: {
      card
    },
  };
}

export default CardDetails;
