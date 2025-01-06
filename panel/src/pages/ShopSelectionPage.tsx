import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import shops from '../mocks/shops';
import { useTranslation } from 'react-i18next';

const ShopSelectionPage: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedShop(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedShop) {
      navigate('/dashboard');
    } else {
      alert('Wybierz sklep.');
    }
  };

  return (
    <div>
      <div>
        <select value={selectedShop} onChange={handleSelectChange}>
          <option value="">{t('shop-select-page.placeholder')}</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleNavigate} disabled={!selectedShop}>
          {t('shop-select-page.button')}
        </button>
      </div>
    </div>
  );
};

export default ShopSelectionPage;
