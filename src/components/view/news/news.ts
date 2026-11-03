import { querySelector } from '../../../utils/DOM';
import { Article } from '../../controller/loader.dto';
import './news.css';

class News {
    public draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = querySelector<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) querySelector('.news__item', newsClone).classList.add('alt');

            querySelector('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            querySelector('.news__meta-author', newsClone).textContent = item.author || item.source.name;
            querySelector('.news__meta-date', newsClone).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            querySelector('.news__description-title', newsClone).textContent = item.title;
            querySelector('.news__description-source', newsClone).textContent = item.source.name;
            querySelector('.news__description-content', newsClone).textContent = item.description;
            querySelector('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        querySelector('.news').innerHTML = '';
        querySelector('.news').appendChild(fragment);
    }
}

export default News;
