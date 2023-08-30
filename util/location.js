const GOOGLE_API_KEY = "AIzaSyCYmLdBn3Cu6jPV3EKJCUM-xPxC6y6U4m4";

export const CreateLocationUrl = ({ lat, lgn }) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lgn}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7C${lat},${lgn}
&key=${GOOGLE_API_KEY}`
}