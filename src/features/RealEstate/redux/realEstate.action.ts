import realEstateAPI from '../modules/realEstate.api';

export const TYPE_REALESTATE = {
  // attributes
  createAttributes: {
    type: 'REALESTATE.createAttributes',
    api: realEstateAPI.createAttributes
  },
  getAllAttributes: {
    type: 'REALESTATE.getAllAttributes',
    api: realEstateAPI.getAllAttributes
  },
  updateAttribtes: {
    type: 'REALESTATE.updateAttribtes',
    api: realEstateAPI.updateAttributes
  },
  getAllParentAttributes: {
    type: 'REALESTATE.getAllParentAttributes',
    api: realEstateAPI.getAllParentAttributes
  },

  //Home
  createHome: {
    type: 'REALESTATE.createHome',
    api: realEstateAPI.createHome
  },
  getAllHomes: {
    type: 'REALESTATE.getAllHomes',
    api: realEstateAPI.getAllHomes
  },
  updateHome: {
    type: 'REALESTATE.updateHome',
    api: realEstateAPI.updateHome
  },

  // HomeAttributes
  setAttributesToHome: {
    type: 'REALESTATE.setAttributesToHome',
    api: realEstateAPI.setAttributesToHome
  },
  getAllAttributesOfHomeId: {
    type: 'REALESTATE.getAllAttributesOfHomeId',
    api: realEstateAPI.getAllAttributesOfHomeId
  },

  updateHomeAttributes: {
    type: 'REALESTATE.updateHomeAttributes',
    api: realEstateAPI.updateHomeAttributes
  },

  // Sell Post
  getAllSellPosts: {
    type: 'REALESTATE.getAllSellPosts',
    api: realEstateAPI.getAllSellPosts
  },
  createSellPost: {
    type: 'REALESTATE.createSellPost',
    api: realEstateAPI.createSellPost
  },
  updateSellPost: {
    type: 'REALESTATE.updateSellPost',
    api: realEstateAPI.updateSellPost
  },
  deleteSellPost: {
    type: 'REALESTATE.deleteSellPost',
    api: realEstateAPI.deleteSellPost
  }
};
