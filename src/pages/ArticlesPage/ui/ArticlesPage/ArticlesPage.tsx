import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Article, ArticleList, ArticleView } from 'entities/Article';
import { useNavigate } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}
//
// const article = {
//     id: '1',
//     title: 'Javascript newsJavascript newsJavascript news',
//     subtitle: 'Что нового в JS за 2022 год?',
//     img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
//     views: 1022,
//     createdAt: '26.02.2022',
//     user: {
//         id: '1',
//         username: 'Alex666000',
//         avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
//     },
//     type: [
//         'IT',
//         'HELLO',
//         'HELLO',
//         'HELLO',
//         'HELLO',
//         'HELLO',
//     ],
//     blocks: [
//         {
//             id: '1',
//             type: 'TEXT',
//             title: 'Заголовок этого блока',
//             paragraphs: [
//                 'Программа, которую по традиции называют «Hello, world!», '
//                 + 'очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
//                 'JavaScript — это язык, программы на котором можно выполнять '
//                 + 'в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе'
//                 + ' Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот '
//                 + 'текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
//             ],
//         },
//         {
//             id: '4',
//             type: 'CODE',
//             code: '<!DOCTYPE html>\n<html>\n  <body>\n   '
//                 + ' <p id="hello"></p>\n\n    <script>\n      document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  </body>\n</html>;',
//         },
//         {
//             id: '5',
//             type: 'TEXT',
//             title: 'Заголовок этого блока',
//             paragraphs: [
//                 'Программа, которую по традиции называют «Hello, world!»,'
//                 + ' очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
//             ],
//         },
//         {
//             id: '2',
//             type: 'IMAGE',
//             src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
//             title: 'Рисунок 1 - скриншот сайта',
//         },
//         {
//             id: '3',
//             type: 'CODE',
//             code: 'const path = require(\'path\');\n\nconst server = jsonServer.create();\n\nconst '
//                 + 'router = jsonServer.router(path.resolve(__dirname, \'db.json\'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);',
//         },
//         {
//             id: '7',
//             type: 'TEXT',
//             title: 'Заголовок этого блока',
//             paragraphs: [
//                 'JavaScript — это язык, программы на котором можно выполнять в разных средах.'
//                 + ' В нашем случае речь идёт о браузерах и о серверной платформе Node.js.'
//                 + 'Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст '
//                 + 'в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
//             ],
//         },
//         {
//             id: '8',
//             type: 'IMAGE',
//             src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
//             title: 'Рисунок 1 - скриншот сайта',
//         },
//         {
//             id: '9',
//             type: 'TEXT',
//             title: 'Заголовок этого блока',
//             paragraphs: [
//                 'JavaScript — это язык, программы на котором можно выполнять в разных средах. '
//                 + 'В нашем случае речь идёт о браузерах и о серверной платформе Node.js. '
//                 + 'Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст '
//                 + 'в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
//             ],
//         },
//     ],
// } as Article;

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList
                view={ArticleView.BIG}
                articles={[]}
            />
        </div>
    );
};

export default memo(ArticlesPage);
