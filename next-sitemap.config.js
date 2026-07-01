/** @type {import('next-sitemap').IConfig} */




const getBlogsData = async () => {
    try {
        const fetchData = await fetch('https://data.luxurycleaning.nz/wp-json/wp/v2/posts?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/blogs/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch blog data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};


const getProjectsData = async () => {
    try {
        const fetchData = await fetch('https://data.luxurycleaning.nz/wp-json/wp/v2/work?acf_format=standard&per_page=100');
        const data = await fetchData.json();
        return data.map(post => `/our-work/${post.slug}`);
    } catch (error) {
        console.error('Failed to fetch our work data:', error);
        return []; // Return an empty array on error to avoid breaking the sitemap generation
    }
};


module.exports = {
    siteUrl: process.env.SITE_URL || 'https://luxurycleaning.nz',
    generateRobotsTxt: true,
    sitemapSize: 1000,
    additionalPaths: async (config) => {
        const blogUrls = await getBlogsData();
        const projectUrls = await getProjectsData();

        // Combine and transform both sets of URLs
        return [
            ...await Promise.all(blogUrls.map(url => config.transform(config, url))),
            ...await Promise.all(projectUrls.map(url => config.transform(config, url))),
        ];
    },


};
