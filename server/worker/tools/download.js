import axios from 'axios'
import cheerio from 'cheerio'

let download = async (url, res) => {
    if (!url) return res.status(400).send(`${res.statusCode}: Bad Request.`)

    try {
        let _r = await axios({
            url,
            method: 'GET'
        })

        let array_download = []
        let $ = cheerio.load(_r.data)
        
        $('#downloadlink2 b a').each((i, elem) => {
            let link = $(elem).attr('href')
            let arr = $(elem).text().split(' ')
            let quality = arr[arr.length - 3]
            let file_type = (url.indexOf('chiasenhac.vn/hd/video/') === -1) ? arr[arr.length - 4].toLowerCase() : arr[arr.length - 5].toLowerCase()
            let label = `${file_type.toUpperCase()}_${quality}`

            array_download.push({
                link: link.replace(/ /g, ''),
                label,
                quality, 
                file_type
            })
        })

        return res.status(200).send(array_download)
    } catch (_e) {
        return res.status(200).send(_e)
    }
}

export default download