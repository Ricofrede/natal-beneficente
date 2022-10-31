import {
	buildCollection,
	buildProperty,
	EntityReference
} from '@camberi/firecms';

type Sponsor = {
	name: string;
	gender: string;
	status: boolean;
	phone: string;
	isZap: boolean;
	email: string;
	child: EntityReference;
}

const sponsorCollection = buildCollection<Sponsor>({
	name: 'Padrinhos',
	singularName: 'Padrinho',
	path: 'sponsors',
	inlineEditing: false,
	group: 'Apadrinhamento',
	permissions: ({ authController }) => ({
		edit: true,
		create: true,
		delete: true
	}),
	properties: {
		name: {
			name: 'Nome',
			validation: { required: true },
			dataType: 'string'
		},
		gender: {
			name: 'Gênero',
			dataType: 'string',
			enumValues: {
				male: 'Masculino',
				female: 'Feminino'
			}
		},
		status: buildProperty({
			name: 'Status',
			description: 'Esta pessoa confirmou participação?',
			dataType: 'boolean'
		}),
		phone: {
			name: 'Telefone',
			validation: { required: true },
			dataType: 'string',
		},
		isZap: buildProperty({
			name: 'Whatsapp',
			description: 'Este telefone tem Whatsapp?',
			dataType: 'boolean'
		}),
		email: {
			name: 'E-mail',
			validation: { required: true },
			dataType: 'string',
		},
		child: buildProperty({
			dataType: 'reference',
			validation: { required: true },
			path: 'children',
			name: 'Criança Apadrinhada',
		})
	}
});

export default sponsorCollection