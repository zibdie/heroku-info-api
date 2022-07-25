import axios from 'axios';
import cheerio from 'cheerio';

type HerokuResponseObject = {
  stack: Object;
  baseTech: string;
  avalSince: string | null;
  supportThrough: string | null;
  status: Object;
};

async function StackAPI(): Promise<Object | string> {
  try {
    const res: string = await axios
      .get('https://devcenter.heroku.com/articles/stack')
      .then((res) => res.data);
    const $ = cheerio.load(res);

    const result: HerokuResponseObject[] = [];

    $(`div[role="main"]`)
      .find('article')
      .find('table')
      .find('tbody')
      .find('tr')
      .each((i, elem) => {
        const stackName = $(elem).find('td').eq(0).text();
        const stackURL = $(elem).find('td').eq(0).find('a').attr('href');
        const baseTech = $(elem).find('td').eq(1).text();
        const avalSince = $(elem).find('td').eq(2).text().includes('N/A')
          ? null
          : $(elem).find('td').eq(2).text();
        const supportThrough = $(elem).find('td').eq(3).text().includes('N/A')
          ? null
          : $(elem).find('td').eq(3).text();

        const statusText = $(elem).find('td').eq(4).text().includes('N/A')
          ? null
          : $(elem).find('td').eq(4).text();
        const statusURL = $(elem).find('td').eq(4).find('a').attr('href')
          ? $(elem).find('td').eq(4).find('a').attr('href')
          : null;

        const stackObj: HerokuResponseObject = {
          stack: { name: stackName, url: stackURL },
          baseTech,
          avalSince,
          supportThrough,
          status: { text: statusText, url: statusURL }
        };
        result.push(stackObj);
      });

    return { success: true, data: result };
  } catch (e: any) {
    return {
      success: false,
      message: 'There was an error fetching stack api',
      error: e.toString()
    };
  }
}

export default StackAPI;
