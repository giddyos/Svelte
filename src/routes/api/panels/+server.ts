import { json } from '@sveltejs/kit'

export function GET() {
    const number = Math.floor(Math.random() * 100);

    // return 401
    return json({ number }, { status: 403 });
}

export async function POST({request}) {
    // const payload = await request.json();

    await new Promise(resolve => setTimeout(resolve, 2000));

    let data: any[] = []

    data.push({
        serial: "Test Serial",
        images: {colored: '/colored.jpg', xray: '/xray.jpg'}
    });

    for (let i = 0; i < 100; i++) {
        let random_hex1 = Math.floor(Math.random()*222225).toString(16);
        let random_hex2 = Math.floor(Math.random()*222225).toString(16);
        data.push({
          serial: `Serial ${i}`,
          images: {colored: `https://placehold.co/1200x120${i}/${random_hex1}/ffffff.png?t=${Math.floor(Math.random()*512515).toString(16)}`, xray: `https://placehold.co/1200x120${i}/${random_hex2}/ffffff.png?=t${Math.floor(Math.random()*55125).toString(16)}`}
        });
      }

    return json(data, { status: 201 })
}

