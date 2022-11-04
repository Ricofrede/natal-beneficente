import {
    buildCollection
} from "@camberi/firecms";

type Social = {
    name: string;
    iconClass: string;
    importance: number;
    status: string;
    url: string;
}

const socialCollection = buildCollection<Social>({
    name: "Redes Sociais",
    singularName: "Rede Social",
    path: "social",
    inlineEditing: false,
    group: 'Principal',
    defaultSize: "s",
    icon: 'Share',
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: true
    }),
    properties: {
        name: {
            name: "Nome",
            validation: { required: true },
            dataType: "string"
        },
        iconClass: {
            name: "Chave do Ícone",
            dataType: "string"
        },
        url: {
            name: "URL do link",
            validation: { required: true },
            dataType: "string"
        },
        importance: {
            name: "Nível de Importância",
            dataType: "number"
        },
        status: {
            name: "Status",
            validation: { required: true },
            dataType: "string",
            description: "Este conteúdo deve aparecer para o público?",
            enumValues: {
                private: "Privado",
                public: "Publico"
            }
        }
    }
});

export default socialCollection