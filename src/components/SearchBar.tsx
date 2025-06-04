import Image from "next/image"

const SearchBar = () =>{
  return(
    <form className="flex justify-between gap-4 bg-gray-100 p-2 rounded-3xl flex-1 max-w-md">
      <input type="text" placeholder="Бүтээгдэхүүн хайх" className="flex-1 bg-transparent outline-none"/>
      <button className="cursor-pointer mr-3">
        <Image src="/search-icon.png" alt="" width={16} height={16}/>
      </button>
    </form>
  )
}

export default SearchBar;