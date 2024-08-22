export type ActiveProject = {
  id: string;
  metadataId: string;
};

export type Metadata = {
  id: string;
  data: Record<string, unknown>[];
};

/**
 * [
 *    { <metadata> },
 * ]
 *
 */

/**
 *  <metadata>  = 
 * {
        "Background": "Blaze",
        "Background Accessories": "None",
        "Background Portal": "None",
        "Beak": "Yellow",
        "Body": "Groovy Blue",
        "Clothing": "Rockstar Jacket",
        "Eye Color": "Blue Gradient",
        "Eye Shape": "None",
        "Eyewear": "None",
        "Foreground Accessories": "None",
        "Headwear": "None",
        "Twitter": "https://twitter.com/TapTools",
        "Website": "https://taptools.io",
        "image": "ipfs://QmdyjwJeSU7cHSELrcKxBJ9F74WGhddq3ZfiWQSGjcfBjU",
        "mediaType": "image/png",
        "name": "tappy3090"
      }
 */
