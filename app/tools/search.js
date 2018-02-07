import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = 'http://search.chiasenhac.vn/search.php?s='

let search = async (s, res) => {
    try {
        let _r = await axios({
            url: BASE_URL + s,
            method: 'get'
        })
        let formData = []
        let $ = cheerio.load(_r.data)
    
        $('.tbtable tbody tr').each((i, elem) => {
            let title = $(elem).find('.tenbh p .musictitle').text()
            let artist = $(elem).find('.tenbh p').text()
                            .replace(/\t/g, '')
                            .replace(/\n/g, '')
                            .replace(title, '')
            let url = $(elem).find('.tenbh p .musictitle').attr('href')
            let duration = $(elem).find('.gen').text()
    
            if (title) {
                formData.push({
                    title,
                    artist,
                    url,
                    duration: duration.substring(0, duration.indexOf(':') + 3),
                    quality: duration.substring(duration.indexOf(':') + 3, duration.length)
                })
            }
        })

        return res.status(200).send(formData)
    } catch (_e) {
        return res.status(200).send(_e)
    }
}

export default search