import { querySelector } from '../../../utils/DOM';
import { NewsSource } from '../../controller/loader.dto';
import './sources.css';

class Sources {
    public draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            querySelector<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            querySelector<HTMLElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        querySelector('.sources').append(fragment);
    }
}

export default Sources;
