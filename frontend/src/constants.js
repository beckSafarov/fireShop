//-- PRODUCT CONSTANTS --
export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'
export const PRODUCT_LIST_PROPERTY_RESET = 'PRODUCT_LIST_PROPERTY_RESET'
export const PRODUCT_ADD_REQUEST = 'PRODUCT_ADD_REQUEST'
export const PRODUCT_ADD_SUCCESS = 'PRODUCT_ADD_SUCCESS'
export const PRODUCT_ADD_FAILURE = 'PRODUCT_ADD_FAILURE'
export const PRODUCT_LIST_UPDATE = 'PRODUCT_LIST_UPDATE'
export const PRODUCT_REVIEW_UPDATE = 'PRODUCT_REVIEW_UPDATE'
export const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST'
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS'
export const PRODUCT_DELETE_FAILURE = 'PRODUCT_DELETE_FAILURE'

export const PRODUCT_SEARCH_REQUEST = 'PRODUCT_SEARCH_REQUEST'
export const PRODUCT_SEARCH_SUCCESS = 'PRODUCT_SEARCH_SUCCESS'
export const PRODUCT_SEARCH_FAILURE = 'PRODUCT_SEARCH_FAILURE'
export const PRODUCT_SEARCH_RESET = 'PRODUCT_SEARCH_RESET'
export const PRODUCT_SEARCH_PROPERTY_RESET = 'PRODUCT_SEARCH_PROPERTY_RESET'

export const PRODUCT_DETAILS_REQUEST = 'PRODUCT_DETAILS_REQUEST'
export const PRODUCT_DETAILS_SUCCESS = 'PRODUCT_DETAILS_SUCCESS'
export const PRODUCT_DETAILS_FAILURE = 'PRODUCT_DETAILS_FAILURE'
export const PRODUCT_DETAILS_UPDATE_REQUEST = 'PRODUCT_DETAILS_UPDATE_REQUEST'
export const PRODUCT_DETAILS_UPDATE_SUCCESS = 'PRODUCT_DETAILS_UPDATE_SUCCESS'
export const PRODUCT_DETAILS_UPDATE_FAILURE = 'PRODUCT_DETAILS_UPDATE_FAILURE'
export const PRODUCT_DETAILS_RESET = 'PRODUCT_DETAILS_RESET'

export const PRODUCT_REVIEW_REQUEST = 'PRODUCT_REVIEW_REQUEST'
export const PRODUCT_REVIEW_SUCCESS = 'PRODUCT_REVIEW_SUCCESS'
export const PRODUCT_REVIEW_FAILURE = 'PRODUCT_REVIEW_FAILURE'
export const PRODUCT_REVIEW_UPDATE_REQUEST = 'PRODUCT_REVIEW_UPDATE_REQUEST'
export const PRODUCT_REVIEW_UPDATE_SUCCESS = 'PRODUCT_REVIEW_UPDATE_SUCCESS'
export const PRODUCT_REVIEW_UPDATE_FAILURE = 'PRODUCT_REVIEW_UPDATE_FAILURE'
export const PRODUCT_REVIEW_PROPERTY_RESET = 'PRODUCT_REVIEW_PROPERTY_RESET'

//-- CART CONSTANTS --
export const CART_REQUIRE_ADD_ITEM = 'CART_REQUIRE_ADD_ITEM'
export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_ADD_ITEM_FAIL = 'CART_ADD_ITEM_FAIL'

export const CART_REQUIRE_BUY_NOW = 'CART_REQUIRE_BUY_NOW'
export const CART_BUY_NOW_SUCCESS = 'CART_BUY_NOW_SUCCESS'
export const CART_BUY_NOW_FAIL = 'CART_BUY_NOW_FAIL'

export const CART_REQUIRE_ALL_ITEMS = 'CART_REQUIRE_ALL_ITEMS'
export const CART_ITEMS_RECEIVED = 'CART_ITEMS_RECEIVED'
export const CART_REQUIRE_ALL_ITEMS_SUCCESS = 'CART_REQUIRE_ALL_ITEMS_SUCCESS'
export const CART_REQUIRE_ALL_ITEMS_FAIL = 'CART_REQUIRE_ALL_ITEMS_FAIL'

export const CART_REMOVE_ITEM_REQUEST = 'CART_REMOVE_ITEM_REQUEST'
export const CART_REMOVE_ITEM_SUCCESS = 'CART_REMOVE_ITEM_SUCCESS'
export const CART_REMOVE_ITEM_FAILURE = 'CART_REMOVE_ITEM_FAILURE'

export const CARD_ITEM_QUANTITY_RESET_REQUIRE =
  'CARD_ITEM_QUANTITY_RESET_REQUIRE'
export const CARD_ITEM_QUANTITY_RESET_SUCCESS =
  'CARD_ITEM_QUANTITY_RESET_SUCCESS'
export const CARD_ITEM_QUANTITY_RESET_FAIL = 'CARD_ITEM_QUANTITY_RESET_FAIL'
export const CART_PROPERTY_RESET = 'CART_PROPERTY_RESET'

export const CART_SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS'
export const CART_SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD'

export const CART_FLUSH_REQUIRE = 'CART_FLUSH_REQUIRE'
export const CART_FLUSH = 'CART_FLUSH_SUCCESS'
export const CART_FLUSH_FAIL = 'CART_FLUSH_FAILED'

//-- USER CONSTANTS --
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE'
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'
export const USER_INFO_UPDATE = 'USER_INFO_UPDATE'

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST'
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS'
export const USER_DETAILS_FAILURE = 'USER_DETAILS_FAILURE'
export const USER_DETAILS_CLEAR = 'USER_DETAILS_CLEAR'

export const USER_DETAILS_UPDATE_REQUEST = 'USER_DETAILS_UPDATE_REQUEST'
export const USER_DETAILS_UPDATE_SUCCESS = 'USER_DETAILS_UPDATE_SUCCESS'
export const USER_DETAILS_UPDATE_FAILURE = 'USER_DETAILS_UPDATE_FAILURE'
export const USER_DETAILS_PROPERTY_RESET = 'USER_DETAILS_PROPERTY_RESET'

// shaddress

export const SHADDRESS_POST_REQUEST = 'SHADDRESS_POST_REQUEST'
export const SHADDRESS_POST_SUCCESS = 'SHADDRESS_POST_SUCCESS'
export const SHADDRESS_POST_FAILURE = 'SHADDRESS_POST_FAILURE'
export const SHADDRESS_PROPERTY_RESET = 'SHADDRESS_PROPERTY_RESET'

// -- ORDER CONSTANTS --
export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'
export const ORDER_DETAILS_RESET = 'ORDER_DETAILS_RESET'

export const ORDER_UPDATE_REQUEST = 'ORDER_UPDATE_REQUEST'
export const ORDER_UPDATE_SUCCESS = 'ORDER_UPDATE_SUCCESS'
export const ORDER_UPDATE_FAIL = 'ORDER_UPDATE_FAIL'
export const ORDER_UPDATE_RESET = 'ORDER_UPDATE_RESET'

export const MY_ORDERS_REQUEST = 'MY_ORDERS_REQUEST'
export const MY_ORDERS_SUCCESS = 'MY_ORDERS_SUCCESS'
export const MY_ORDERS_FAIL = 'MY_ORDERS_FAIL'

// admin related
export const USER_LIST_REQUEST = 'USER_LIST_REQUEST'
export const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
export const USER_LIST_FAILURE = 'USER_LIST_FAILURE'
export const USER_LIST_REMOVE = 'USER_LIST_REMOVE'
export const USER_LIST_UPDATE = 'USER_LIST_UPDATE'
export const USER_LIST_PROPERTY_RESET = 'USER_LIST_PROPERTY_RESET'

export const ADMIN_USER_DELETE_REQUEST = 'ADMIN_USER_DELETE_REQUEST'
export const ADMIN_USER_DELETE_SUCCESS = 'ADMIN_USER_DELETE_SUCCESS'
export const ADMIN_USER_DELETE_FAILURE = 'ADMIN_USER_DELETE_FAILURE'
export const ADMIN_USER_DELETE_RESET = 'ADMIN_USER_DELETE_RESET'

export const ADMIN_USER_UPDATE_REQUEST = 'ADMIN_USER_UPDATE_REQUEST'
export const ADMIN_USER_UPDATE_SUCCESS = 'ADMIN_USER_UPDATE_SUCCESS'
export const ADMIN_USER_UPDATE_FAILURE = 'ADMIN_USER_UPDATE_FAILURE'
export const ADMIN_USER_UPDATE_RESET = 'ADMIN_USER_UPDATE_RESET'

export const ADMIN_SEARCH_USER_REQUEST = 'ADMIN_SEARCH_USER_REQUEST'
export const ADMIN_SEARCH_USER_SUCCESS = 'ADMIN_SEARCH_USER_SUCCESS'
export const ADMIN_SEARCH_USER_FAILURE = 'ADMIN_SEARCH_USER_FAILURE'
export const ADMIN_SEARCH_PROPERTY_RESET = 'ADMIN_SEARCH_PROPERTY_RESET'
export const ADMIN_SEARCH_USER_RESET = 'ADMIN_SEARCH_USER_RESET'

export const ORDERS_LIST_REQUEST = 'ORDERS_LIST_REQUEST'
export const ORDERS_LIST_SUCCESS = 'ORDERS_LIST_SUCCESS'
export const ORDERS_LIST_FAILURE = 'ORDERS_LIST_FAILURE'
export const ORDERS_LIST_UPDATE_REQUEST = 'ORDERS_LIST_UPDATE_REQUEST'
export const ORDERS_LIST_UPDATE_SUCCESS = 'ORDERS_LIST_UPDATE_SUCCESS'
export const ORDERS_LIST_UPDATE_FAILURE = 'ORDERS_LIST_UPDATE_FAILURE'
export const ORDERS_LIST_RESET = 'ORDERS_LIST_RESET'
export const ORDERS_LIST_PROPERTY_RESET = 'ORDERS_LIST_PROPERTY_RESET'

export const ORDERS_FILTER_REQUEST = 'ORDERS_FILTER_REQUEST'
export const ORDERS_FILTER_SUCCESS = 'ORDERS_FILTER_SUCCESS'
export const ORDERS_FILTER_FAILURE = 'ORDERS_FILTER_FAILURE'
export const ORDERS_FILTER_RESET = 'ORDERS_FILTER_RESET'

export const IMG_UPLOAD_REQUEST = 'IMG_UPLOAD_REQUEST'
export const IMG_UPLOAD_SUCCESS = 'IMG_UPLOAD_SUCCESS'
export const IMG_UPLOAD_FAILURE = 'IMG_UPLOAD_FAILURE'
export const IMG_UPLOAD_RESET = 'IMG_UPLOAD_RESET'
