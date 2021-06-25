import { setDashboard } from "../helpers/helpers"

export const setAuth = (payload) => {
  return {
    type: "AUTH",
    payload
  }
}
export const setUser = (payload) => {
  return {
    type: "USER",
    payload
  }
}
export const chooseDashboard = (payload) => {
  console.log(payload, 'action')
  // setDashboard(payload)
  return {
    type: "DASHBOARD",
    payload
  }
}
export const setProperties = (payload) => {
  return {
    type: "PROPERTIES",
    payload
  }
}
export const setPropertyTypes = (payload) => {
  return {
    type: "PROPERTY_TYPES",
    payload
  }
}
export const setTrendingAndBestCribs = (payload) => {
  return {
    type: "TRENDING_AND_BEST_CRIBS",
    payload
  }
}
export const setCrib = (payload) => {
  return {
    type: "CRIB",
    payload
  }
}