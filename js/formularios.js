/**
 * PetRafael — validação e feedback dos formulários (cadastro e agendamento)
 * Sem backend: exibe resumo e impede envio real (demonstração acadêmica).
 */

(function () {
  'use strict';

  /** Remove caracteres não numéricos de uma string. */
  function apenasDigitos(s) {
    return String(s || '').replace(/\D/g, '');
  }

  /**
   * Validação simples de CPF (11 dígitos + dígitos verificadores).
   * Retorna true se válido ou campo vazio (use required no HTML para obrigatoriedade).
   */
  function cpfValido(cpf) {
    var n = apenasDigitos(cpf);
    if (n.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(n)) return false;

    var i;
    var soma = 0;
    for (i = 0; i < 9; i++) soma += parseInt(n.charAt(i), 10) * (10 - i);
    var d1 = 11 - (soma % 11);
    if (d1 >= 10) d1 = 0;
    if (d1 !== parseInt(n.charAt(9), 10)) return false;

    soma = 0;
    for (i = 0; i < 10; i++) soma += parseInt(n.charAt(i), 10) * (11 - i);
    var d2 = 11 - (soma % 11);
    if (d2 >= 10) d2 = 0;
    return d2 === parseInt(n.charAt(10), 10);
  }

  /** Formata CPF enquanto o usuário digita (000.000.000-00). */
  function mascararCpf(input) {
    input.addEventListener('input', function () {
      var v = apenasDigitos(input.value).slice(0, 11);
      var out = v;
      if (v.length > 9) {
        out = v.slice(0, 3) + '.' + v.slice(3, 6) + '.' + v.slice(6, 9) + '-' + v.slice(9);
      } else if (v.length > 6) {
        out = v.slice(0, 3) + '.' + v.slice(3, 6) + '.' + v.slice(6);
      } else if (v.length > 3) {
        out = v.slice(0, 3) + '.' + v.slice(3);
      }
      input.value = out;
    });
  }

  /** Formata telefone brasileiro simples (11) 99999-9999. */
  function mascararTelefone(input) {
    input.addEventListener('input', function () {
      var v = apenasDigitos(input.value).slice(0, 11);
      if (v.length <= 2) input.value = v.length ? '(' + v : '';
      else if (v.length <= 6) input.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length <= 10) {
        input.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 6) + '-' + v.slice(6);
      } else {
        input.value =
          '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7, 11);
      }
    });
  }

  function mostrarStatus(id, mensagem, sucesso) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = mensagem;
    el.classList.add('alert');
    el.classList.remove('alert-success', 'alert-danger', 'alert-warning');
    el.classList.add(sucesso ? 'alert-success' : 'alert-danger');
    el.classList.remove('d-none');
    el.setAttribute('aria-live', 'polite');
  }

  /** Segunda a sábado, entre 9h e 19h (fechado no domingo). */
  function dentroDoHorarioComercial(data) {
    var d = new Date(data);
    if (isNaN(d.getTime())) return false;
    var dia = d.getDay();
    if (dia === 0) return false;
    var h = d.getHours();
    return h >= 9 && h < 19;
  }

  function initCadastro() {
    var form = document.getElementById('form-cadastro-cliente-pet');
    if (!form) return;

    var cpf = document.getElementById('cadastro-cpf');
    var tel = document.getElementById('cadastro-telefone');
    if (cpf) mascararCpf(cpf);
    if (tel) mascararTelefone(tel);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (cpf && cpf.value && !cpfValido(cpf.value)) {
        mostrarStatus('status-formulario', 'CPF inválido. Verifique os dígitos.', false);
        cpf.focus();
        return;
      }
      var nomeCliente = document.getElementById('cadastro-nome-cliente');
      var nomePet = document.getElementById('cadastro-nome-pet');
      var resumo =
        'Cadastro simulado com sucesso. Cliente: ' +
        (nomeCliente ? nomeCliente.value : '') +
        ' | Pet: ' +
        (nomePet ? nomePet.value : '') +
        '. Em um sistema real, os dados seriam enviados ao servidor.';
      mostrarStatus('status-formulario', resumo, true);
    });
  }

  function initAgendamento() {
    var form = document.getElementById('form-agendamento-servico');
    if (!form) return;

    var dt = document.getElementById('agendamento-datetime');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (dt && dt.value) {
        var escolhida = new Date(dt.value);
        var agora = new Date();
        if (escolhida.getTime() < agora.getTime()) {
          mostrarStatus(
            'status-agendamento',
            'Escolha uma data e horário futuros.',
            false
          );
          dt.focus();
          return;
        }
        if (!dentroDoHorarioComercial(escolhida)) {
          mostrarStatus(
            'status-agendamento',
            'Horário deve ser em dias úteis (segunda a sábado), entre 9h e 19h.',
            false
          );
          dt.focus();
          return;
        }
      }
      var servico = form.querySelector('input[name="servico"]:checked');
      var modo = form.querySelector('input[name="modo_atendimento"]:checked');
      var s = servico ? servico.value : '';
      var m = modo ? modo.value : '';
      var resumo =
        'Agendamento simulado: serviço ' +
        s +
        ', modo ' +
        m +
        (dt && dt.value ? ' para ' + dt.value : '') +
        '. Em produção, isso seria gravado na agenda do petshop.';
      mostrarStatus('status-agendamento', resumo, true);
    });
  }

  function initContato() {
    var form = document.getElementById('form-contato');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var status = document.getElementById('status-contato');
      if (status) {
        status.textContent =
          'Mensagem registrada apenas em demonstração. Em um site real, seria enviada ao servidor.';
        status.classList.remove('d-none');
        status.classList.add('alert', 'alert-info');
        status.setAttribute('aria-live', 'polite');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCadastro();
    initAgendamento();
    initContato();
  });
})();
