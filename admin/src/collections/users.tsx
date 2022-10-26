import {
    buildCollection
} from "@camberi/firecms";

type User = {
    name: string;
    admin: boolean;
}

const usersCollection = buildCollection<User>({
    name: "Usuários",
    singularName: "Usuário",
    path: "users",
    inlineEditing: false,
    group: 'Ferramentas',
    customId: true,
    permissions: ({ authController }) => ({
        edit: false,
        create: true,
        delete: false
    }),
    properties: {
        name: {
            name: "Nome",
            validation: { required: true },
            dataType: "string"
        },
        admin: {
            name: "Admin?",
            dataType: "boolean"
        }
    }
});

export default usersCollection