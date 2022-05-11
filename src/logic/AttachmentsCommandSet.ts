import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { ReferenceV1Schema } from '../data/version1/ReferenceV1Schema';
import { IAttachmentsController } from './IAttachmentsController';

export class AttachmentsCommandSet extends CommandSet {
    private _logic: IAttachmentsController;

	constructor(logic: IAttachmentsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetAttachmentByIdCommand());
		this.addCommand(this.makeAddAttachmentsCommand());
		this.addCommand(this.makeUpdateAttachmentsCommand());
		this.addCommand(this.makeRemoveAttachmentsCommand());
		this.addCommand(this.makeDeleteAttachmentByIdCommand());
	}

	private makeGetAttachmentByIdCommand(): ICommand {
		return new Command(
			"get_attachment_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
				let id = args.getAsNullableString("id");
				return await this._logic.getAttachmentById(correlationId, id);
			}
		);
	}

	private makeAddAttachmentsCommand(): ICommand {
		return new Command(
			"add_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('ids', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				return await this._logic.addAttachments(correlationId, reference, ids);
			}
		);
	}
    
	private makeUpdateAttachmentsCommand(): ICommand {
		return new Command(
			"update_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('old_ids', new ArraySchema(TypeCode.String))
				.withRequiredProperty('new_ids', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
				let reference = args.get("reference");
				let oldIds = args.get("old_ids");
				let newIds = args.get("new_ids");
				return await this._logic.updateAttachments(correlationId, reference, oldIds, newIds);
			}
		);
	}

	private makeRemoveAttachmentsCommand(): ICommand {
		return new Command(
			"remove_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('ids', new ArraySchema(TypeCode.String)),
			async (correlationId: string, args: Parameters) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				return await this._logic.removeAttachments(correlationId, reference, ids);
			}
		);
	}

	private makeDeleteAttachmentByIdCommand(): ICommand {
		return new Command(
			"delete_attachment_by_id",
			null,
			async (correlationId: string, args: Parameters) => {
				let id = args.getAsNullableString("id");
				return await this._logic.deleteAttachmentById(correlationId, id);
			}
		);
	}

}