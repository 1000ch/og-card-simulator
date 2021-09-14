import {rog} from 'rog';
import {rogUrl} from 'rog-plugin-url';
import {rogTitle} from 'rog-plugin-title';
import {rogImage} from 'rog-plugin-image';
import {rogDescription} from 'rog-plugin-description';

export default async function og(request, response) {
  try {
    const data = await rog(request.body.url, {
      url: rogUrl,
      title: rogTitle,
      image: rogImage,
      description: rogDescription,
    });

    response.json(data);
  } catch (error) {
    response.json(error);
  }
}
