import { useQuery } from '@tanstack/react-query';
import { Mushroom } from '@shared/types';

async function fetchMushrooms(): Promise<Mushroom[]> {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log('API URL:', apiUrl);
  const response = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          allMushrooms {
            name
            image
            description
            isPoisonous
            isFood
            needExtraHeat
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.allMushrooms;
}

function useMushrooms() {
  return useQuery({
    queryKey: ['mushrooms'], 
    queryFn: fetchMushrooms, 
    staleTime: 1000 * 60 * 5, 
  });
}

export { useMushrooms };
