class OpenWindow < SitePrism::Page
    set_url '/windows'
    element :click_link, 'a[href="/windows/new"]'
end