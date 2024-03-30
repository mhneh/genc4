/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import {RendererService} from '@app/wireframes/model/renderer/renderer.service.ts';
import {Register} from "@app/wireframes/shapes/components/register.ts";
import {C4Control} from "@app/wireframes/model/renderer/impl/c4-control.ts";
import {SignIn} from "@app/wireframes/shapes/components/signin.ts";
import {Post} from "@app/wireframes/shapes/components/post.ts";
import {ResetPassword} from "@app/wireframes/shapes/components/reset-password.ts";
import {Security} from "@app/wireframes/shapes/components/security.ts";
import {EmailComponent} from "@app/wireframes/shapes/components/email.ts";
import {Database} from "@app/wireframes/shapes/containers/database.ts";
import {SinglePageApplication} from "@app/wireframes/shapes/containers/spa.ts";
import {ApiApplication} from "@app/wireframes/shapes/containers/api-application.ts";
import {EmailSystem} from "@app/wireframes/shapes/contexts/email-system.ts";
import {PersonalOwner} from "@app/wireframes/shapes/contexts/person.ts";
import {RelationshipControl} from "@app/wireframes/model/renderer/impl/RelationshipControl.ts";
import {Relationship} from "@app/wireframes/shapes/components/relationship.ts";

export function registerShapeRenderers() {
}

export function registerComponents() {
    RendererService.addRenderer(new C4Control(new Register()));
    RendererService.addRenderer(new C4Control(new SignIn()));
    RendererService.addRenderer(new C4Control(new Post()));
    RendererService.addRenderer(new C4Control(new ResetPassword()));
    RendererService.addRenderer(new C4Control(new Security()));
    RendererService.addRenderer(new C4Control(new EmailComponent()));

    RendererService.addRenderer(new C4Control(new Database()));
    RendererService.addRenderer(new C4Control(new SinglePageApplication()));
    RendererService.addRenderer(new C4Control(new ApiApplication()));

    RendererService.addRenderer(new C4Control(new EmailSystem()));
    RendererService.addRenderer(new C4Control(new PersonalOwner()));

    RendererService.addRenderer(new RelationshipControl(new Relationship()));
}