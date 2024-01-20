// Modules
import Table from 'react-bootstrap/Table';
import { PropTypes } from 'prop-types';

// Helper
import RemoveTableItem from './removeTableItem';

const DeviceTable = ({ data, title }) => {
  const headerList = data[0] ? Object.keys(data[0]) : [];

  return <div>
    <h3>
      {title.charAt(0).toUpperCase() + title.slice(1) + `s`}
    </h3>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {headerList.map((headerItem, i) => 
            <th key={i}>
              {headerItem}
            </th>
          )}
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => 
          <tr key={item.id}>
            <td>{i + 1}</td>
            {headerList.map((headerItem, i) => 
              <td key={i}>
                {item[headerItem]}
              </td>
            )}
            <td style={{ display: "flex", justifyContent: "center" }}>
              <RemoveTableItem id={item.id} title={title} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
};

DeviceTable.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default DeviceTable;
