import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { defaultProjects, defaultServices, defaultAbout } from './fallbackData';


export const client = createClient({
  projectId: 'ikmb41m3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-01',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Carousel Items
export const getCarouselItems = async () => {
  try {
    const items = await client.fetch(`
      *[_type == "carousel"] | order(order asc) {
        _id,
        title,
        subtitle,
        description,
        "image": mainImage.asset->url,
        order,
        linkedProject-> {
          "slug": slug.current,
          title
        }
      }
    `);
    return items || [];
  } catch (error) {
    console.error('Error fetching carousel items:', error);
    return [];
  }
};

//Services
export const getProjectBySlug = async (slug: string) => {
  try {
    const project = await client.fetch(`
      *[_type == "project" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        category,
        location,
        year,
        description,
        "mainImage": mainImage.asset->url,
        "gallery": gallery[].asset->url,
        details
      }
    `, { slug });
    return project;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

// Fetch homepage content
export const getHomepageContent = async () => {
  try {
    const homepage = await client.fetch(`
      *[_type == "homepage"][0] {
        dreamStatement {
          title,
          description,
          projectImages[] {
            title,
            category,
            "image": image.asset->url
          }
        },
        quote {
          text
        },
        designPhilosophy {
          title
        },
        servicesSection {
          title,
          description
        }
      }
    `);

    if (!homepage) {
      throw new Error('Homepage content not found');
    }

    return homepage;
  } catch (error) {
    console.error('Error fetching homepage content:', error);
    throw error;
  }
};

// Fetch projects
export const getProjects = async () => {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        slug,
        category,
        location,
        year,
        description,
        "mainImage": mainImage.asset->url,
        "gallery": gallery[].asset->url,
        details
      }
    `);

    if (!projects || projects.length === 0) {
      return defaultProjects;
    }

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return defaultProjects;
  }
};

// Fetch services
export const getServices = async () => {
  try {
    const services = await client.fetch(`
      *[_type == "service"] | order(number asc) {
        _id,
        number,
        title,
        description,
        "image": mainImage.asset->url,
      }
    `);

    if (!services || services.length === 0) {
      return defaultServices;
    }

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return defaultServices;
  }
};

// Fetch about content
export const getAboutContent = async () => {
  try {
    const about = await client.fetch(`
      *[_type == "about"][0] {
        hero {
          title,
          description,
          "backgroundImage": backgroundImage.asset->url
        },
        vision,
        mission,
        coreValues,
        story {
          title,
          content,
          "image": image.asset->url
        },
        philosophy {
          title,
          description,
          "backgroundImage": backgroundImage.asset->url
        },
        stats,
        testimonial
      }
    `);
    
    if (!about) {
      return defaultAbout;
    }
    
    return about;
  } catch (error) {
    console.error('Error fetching about content:', error);
    return defaultAbout;
  }
};

export const getTeamMembers = async () => {
  try {
    return await client.fetch(`
        *[_type == "teamMember"] | order(order asc) {
          _id,
          name,
          role,
          "image": image.asset->url,
          bio
        }
      `);
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};