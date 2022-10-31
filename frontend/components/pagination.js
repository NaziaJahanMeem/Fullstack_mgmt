import _ from 'lodash'
const Pagination = ({ items, pageSize, currentPage,onPageChange }) => {
  const pageCount=items/pageSize;
  if(Math.ceil(pageCount)===1) return null;
  const pages= _.range(1,pageCount+1)
  return (
    <nav>
    <ul className="flex flex-row pt-3">
      {pages.map((page)=>(
        <li key={page} className={page===currentPage ? "page-item-active" : "page-item"}>
        <a onClick={()=>onPageChange(page)} style={{ cursor:'pointer' }} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"  tabindex="-1">
          {page}
        </a>
      </li>
      ))}
      
    
    </ul>
  </nav>
  );
};

export default Pagination;