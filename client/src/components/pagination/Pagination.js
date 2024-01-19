// Modules
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';

// Features
import { 
  selectDeviceLimit,
  selectDevicePage,
  selectDeviceTotalCount, 
  setPage
} from '../../features/deviceSlice';

const ShopPagination = () => {
  const dispatch = useDispatch();

  const deviceLimit = useSelector(selectDeviceLimit);
  const deviceTotalCount = useSelector(selectDeviceTotalCount);
  const currentPage = useSelector(selectDevicePage);
  const pages = Math.ceil(deviceTotalCount / deviceLimit);

  const handlerChangePage = (page) => {
    dispatch(setPage(page));
  };

  let arrPages = [];
  for (let i = 1; i <= pages ; i++ ) {
    arrPages.push(i < 10 ? i : i);
  }

  return <div>
    <Pagination>
      {arrPages.map((page) => 
        <Pagination.Item 
          key={page} 
          active={currentPage === page}
          onClick={() => handlerChangePage(page)}
        >
          {page}
        </Pagination.Item>
      )}
    </Pagination>
  </div>
};

export default ShopPagination;
