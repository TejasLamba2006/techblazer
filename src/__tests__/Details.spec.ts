import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import People from '../pages/People.vue'
import Projects from '../pages/Projects.vue'

describe('People.vue Modal Navigation', () => {
  it('shows participant details, allows navigating to project details, and back to another participant', async () => {
    const wrapper = mount(People)

    // Initially modal should not be open
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)

    // Find all "More Detail" buttons
    const buttons = wrapper.findAll('button')
    const moreDetailButtons = buttons.filter((btn) => btn.text() === 'More Detail')
    expect(moreDetailButtons.length).toBeGreaterThan(0)

    // Click "More Detail" on the first participant (Aryan Maini)
    await moreDetailButtons[0]!.trigger('click')

    // Modal should now be open
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Aryan Maini')

    // Check if the assigned projects are listed
    const projectCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(projectCards.length).toBe(2)
    expect(projectCards[0]!.text()).toContain('Distributed Avionics Telemetry System')
    expect(projectCards[1]!.text()).toContain('WebGL Real-time Telemetry Dashboard')

    // Click "View Project" on Distributed Avionics Telemetry System
    const viewProjectBtn = projectCards[0]!.find('button')
    await viewProjectBtn.trigger('click')

    // Modal should switch to Project Detail mode
    expect(wrapper.find('.detail-modal-content h2').text()).toBe(
      'Distributed Avionics Telemetry System',
    )

    // Project team members should be listed
    const teamCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(teamCards.length).toBe(2)
    expect(teamCards[0]!.text()).toContain('Aryan Maini')
    expect(teamCards[1]!.text()).toContain('Pramodh Srinivasan')

    // Click "View Profile" on Pramodh Srinivasan
    const viewProfileBtn = teamCards[1]!.find('button')
    await viewProfileBtn.trigger('click')

    // Modal should switch back to showing Pramodh Srinivasan
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Pramodh Srinivasan')

    // Close the details modal
    const closeBtn = wrapper.find('.btn-close')
    await closeBtn.trigger('click')

    // Modal should be closed
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)
  })
})

describe('Projects.vue Modal Navigation', () => {
  it('shows project details and allows navigating to participant details', async () => {
    const wrapper = mount(Projects)

    // Initially modal should not be open
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)

    // Find all "More Detail" buttons
    const buttons = wrapper.findAll('button')
    const moreDetailButtons = buttons.filter((btn) => btn.text() === 'More Detail')
    expect(moreDetailButtons.length).toBeGreaterThan(0)

    // Click "More Detail" on the first project (STM32 Edge AI Smart Camera)
    await moreDetailButtons[0]!.trigger('click')

    // Modal should now be open in Project Detail mode
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('STM32 Edge AI Smart Camera')

    // Check if team members are listed
    const teamCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(teamCards.length).toBe(2)
    expect(teamCards[0]!.text()).toContain('Pranav Arora')
    expect(teamCards[1]!.text()).toContain('Aaditya Singh')

    // Click "View Profile" on Pranav Arora
    const viewProfileBtn = teamCards[0]!.find('button')
    await viewProfileBtn.trigger('click')

    // Modal should switch to Person Detail mode
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Pranav Arora')

    // Close the details modal
    const closeBtn = wrapper.find('.btn-close')
    await closeBtn.trigger('click')

    // Modal should be closed
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)
  })
})
