import Header from "../components/Header";
import Footer from "../components/Footer"
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";


function Search({searchResults}) {

    const router=useRouter()
    const{location,startDate,endDate,noOfGuests}=router.query
    const formattedStartDate=format(new Date(startDate),"dd MMMM yy")
    const formattedEndDate=format(new Date(endDate),"dd MMMM yy")
    const range=`${formattedStartDate} - ${formattedEndDate}`

  



    return (
        <div className="">
           <Header placeholder={`${location} | ${range} | ${noOfGuests} ${noOfGuests==1 ? "guest":"guests"}`}/>

           <main className="flex">
               <section className="flex-grow pt-14 px-6">
                    <p className="text-xs">300+ Stays - {range} - for {noOfGuests} {noOfGuests==1 ? "guest":"guests"}</p>
                    <h1 className ="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap ml-5">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type Of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Rooms and Beds</p>
                        <p className="button">More Filters</p>
                    </div>

                    <div className="flex flex-col">
                        {searchResults.map(
                            ({img,location,title,description,star,price,total}) =>(
                            
                            <InfoCard 
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}
                            />
                        ))}
                    </div>

                    
               </section>

           </main>
           <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps(context){
    const searchResults= await fetch("https://links.papareact.com/isz")
                                    .then(res=>res.json());

    return{
        props:{
            searchResults,
        }
    }

}