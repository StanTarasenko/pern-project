// Modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';

// Features
import { getBrands, selectBrandList, selectBrandStatus } from '../features/brandSlice';

const BrandBar = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrandList);
  const brandStatus = useSelector(selectBrandStatus);

  const [selectedBrand, setSelectedBrand] = useState({});

  useEffect(() => {
    if (brandStatus === 'idle') {
      dispatch(getBrands());
    }
  }, [brandStatus, dispatch]);

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {brands && brands.map((brand) => 
          <Card 
            onClick={() => setSelectedBrand(brand)} 
            key={brand.id}
            style={{ 
              cursor: "pointer", 
              color: selectedBrand.id === brand.id ? "green" : "black",
              marginRight: "10px",
              padding: "8px"
            }}
          >
            {brand.name}
          </Card>
        )}
      </div>
    </Container>
  );
};

export default BrandBar;
