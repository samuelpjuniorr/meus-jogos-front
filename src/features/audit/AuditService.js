import { BaseService } from 'vue-prodeb';

export default class AuditService extends BaseService {
  static domain = 'audit';

  constructor() {
    super(AuditService.domain);
  }

  /**
   * Lista de tipos de autitoria
   */
  static listTypes() {
    const auditPath = 'views.fields.audit.';
    return [
      { id: '', label: `${auditPath}allResources` },
      { id: 'created', label: `${auditPath}type.created` },
      { id: 'updated', label: `${auditPath}type.updated` },
      { id: 'deleted', label: `${auditPath}type.deleted` },
    ];
  }

  /**
   * Pega a lista de models que são auditados
   */
  static getAuditedModels() {
    return BaseService.request('GET', `${AuditService.domain}\\models`);
  }
}
