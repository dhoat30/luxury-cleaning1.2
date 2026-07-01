export const getPageData = async (slug) => {
    let response = await fetch(`${process.env.url}/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await response.json();
    return data
}


//get projects 
export const getProjects = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

//fetch work categories 
export const getProjectCategories = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work-category`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

// fetch single project 
export const getSingleProject = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/work?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

export const getOptions = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/options/all`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

//get service packages  
export const getServicePackages = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/service-package?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

export const getSingleServicePackage = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/service-package?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}
// get single service package 

// get all blogs  
export const getBlogsData = async () => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?acf_format=standard&per_page=100`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}
// get single blog data 
export const getSingleBlog = async (slug) => {
    let fetchData = await fetch(`${process.env.url}/wp-json/wp/v2/posts?slug=${slug}&acf_format=standard`, {
        next: { revalidate: 60 },
    });
    let data = await fetchData.json();
    return data
}

