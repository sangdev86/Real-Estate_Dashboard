import service from 'src/services/client';

const realEstateAPI = {
  // Attributes
  createAttributes: (body: any) => service.fetchData('/attributes', 'POST', body),
  getAllAttributes: () => service.fetchData('/attributes/all'),
  getAllParentAttributes: () => service.fetchData('/attributes/parents/all'),
  updateAttributes: (body: any) => service.fetchData('/attributes', 'PUT', body),

  // Home
  createHome: (body: any) => service.fetchData('/homes', 'POST', body),
  getAllHomes: () => service.fetchData('/homes'),
  updateHome: (body: any) => service.fetchData('/homes', 'PUT', body),
  deleteHome: (id: any) => service.fetchData(`/home/${id}`),

  // HomeAttributes
  setAttributesToHome: (body: any) => service.fetchData('homes/attributes', 'POST', body),
  getAllAttributesOfHomeId: (HomeId: any) => service.fetchData(`homes/${HomeId}/attributes`),
  updateHomeAttributes: (body: any) => service.fetchData('homes/attributes', 'PUT', body),

  /// Sell
  createSellPost: (body: any) => {
    return service.fetchData('/sell', 'POST', body);
  },
  updateSellPost: (body: any) => {
    return service.fetchData('/sell', 'PUT', body);
  },
  deleteSellPost: (id: any) => {
    return service.fetchData(`/sell/${id}`, 'DELETE');
  },
  getAllSellPosts: () => service.fetchData('/sell')
};

export default realEstateAPI;
