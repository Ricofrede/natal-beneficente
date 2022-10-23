import {
    buildCollection,
    buildProperty,
} from "@camberi/firecms";

type Image = {
    title: string;
    caption: string;
    image: string;
}

const imagesCollection = buildCollection<Image>({
    name: "Imagens",
    singularName: "Imagem",
    path: "images",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        delete: true
    }),
    properties: {
        title: {
            name: "Título",
            validation: { required: true },
            dataType: "string"
        },
        caption: {
            name: "Descrição",
            dataType: "string"
        },
        image: buildProperty({ // The `buildProperty` method is a utility function used for type checking
            name: "Imagem",
            validation: { required: true },
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        })
    }
});

export default imagesCollection