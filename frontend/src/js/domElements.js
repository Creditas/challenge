/**
 * catch all objects the dom and initialize values default
 **/

import setValuesToGuarantee from './setValuesToGuarantee'
import * as DOM from './constans'

export default (() => {
  const dom = {}

  const catchDom = () => {
    dom.guarantee = document.getElementById(DOM.GUARANTEE)
    dom.months = document.getElementById(DOM.MONTHS)
    dom.valueGuaranteeRange = document.getElementById(DOM.VALUE_GUARANTEE_RANGE)
    dom.valueGuarantee = document.getElementById(DOM.VALUE_GUARANTEE)
    dom.valueBusinessRange = document.getElementById(DOM.VALUE_BUSINESS_RANGE)
    dom.valueBusiness = document.getElementById(DOM.VALUE_BUSINESS)
    dom.valuesGuaranteeRangeBottom = document.getElementById(DOM.VALUE_GUARANTEE_RANGE_BOTTOM)
    dom.valuesBusinessRangeBottom = document.getElementById(DOM.VALUE_BUSINESS_RANGE_BOTTOM)
    dom.quotaMonth = document.getElementById(DOM.QUOTA_MONTH)
    dom.quotaTotal = document.getElementById(DOM.QUOTA_TOTAL)
    dom.taxMonth = document.getElementById(DOM.TAX_MONTH)
    dom.form = document.querySelector(DOM.FORM)
  }

  const initialize = () => {
    catchDom()
    setValuesToGuarantee({
      key: null,
      element: dom
    })
  }

  return {
    init: initialize,
    element: dom
  }
})()
