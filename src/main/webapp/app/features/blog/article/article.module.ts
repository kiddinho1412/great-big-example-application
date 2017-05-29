import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared/shared.module';
import { ArticleRouting } from './article.routing';

const articleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'article/:slug',
        component: ArticleComponent
    }
]);

@NgModule({
    imports: [
        ArticleRouting,
        SharedModule
    ],
    declarations: [
        ArticleComponent,
        ArticleCommentComponent,
        MarkdownPipe
    ],
    providers: [
    ]
})
export class ArticleModule { }
