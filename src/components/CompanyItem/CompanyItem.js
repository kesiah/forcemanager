import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CompanyItem = (props) => {
  const { item, handleDelete } = props;

  const {
    id, name, salesRepId1, dateCreated, typeId, address1, address2, countryId,
  } = item;

  const formatDate = (valueDate) => {
    const date = new Date(valueDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;

    return `${day}/${month}/${year}`;
  };

  const salesResponsible = (salesRepId1) ? salesRepId1.value : '';
  let address = '';
  if (address1) address = `${address1}`;
  if (address2) address = `${address} ${address2}`;

  const country = (countryId) ? countryId.value : '';
  const typeCompany = (typeId) ? typeId.value : '';

  return (
    <div>
      <h2>{name}</h2>
      <div>{salesResponsible}</div>
      <div>{formatDate(dateCreated)}</div>
      <div>{typeCompany}</div>
      <div>{address}</div>
      <div>{country}</div>
      <ul>
        <li>
          <Link to={`/company/${id}`}>Editar</Link>
        </li>
        <li>
          <button className="delete" type="button" onClick={() => handleDelete(id)}>Eliminar</button>
        </li>
      </ul>
    </div>
  );
};

CompanyItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address1: PropTypes.string,
    address2: PropTypes.string,
    dateCreated: PropTypes.string,
    typeId: PropTypes.object,
    countryId: PropTypes.object,
    salesRepId1: PropTypes.object,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default CompanyItem;
