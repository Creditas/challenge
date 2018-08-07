class CheckPage < SitePrism::Page
    set_url 'dynamic_controls'
    element :btn_remove, '#btn'
    element :btn_checkbox, 'input[type="checkbox"]'
end