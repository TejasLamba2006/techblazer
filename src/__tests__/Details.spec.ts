import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import People from '../pages/People.vue'
import Projects from '../pages/Projects.vue'

describe('People.vue Modal Navigation', () => {
  it('shows participant details, allows navigating to project details, and back to another participant', async () => {
    const wrapper = mount(People)

    // Initially modal should not be open
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)

    // Find all participant cards
    const participantCards = wrapper.findAll('.hover-profile-card')
    expect(participantCards.length).toBeGreaterThan(0)

    // Find the participant card for Tejas Lamba
    const tejasCard = participantCards.find((card) => card.text().includes('Tejas Lamba'))
    expect(tejasCard).toBeDefined()

    // Click on the participant card
    await tejasCard!.trigger('click')

    // Modal should now be open
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Tejas Lamba')

    // Check if the assigned projects are listed
    const projectCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(projectCards.length).toBe(3)
    const cardTexts = projectCards.map(c => c.text())
    expect(cardTexts.some(text => text.includes('Tic-Tac-Toe Model'))).toBe(true)
    expect(cardTexts.some(text => text.includes('Wheel Encoderless Robot Odometry'))).toBe(true)
    expect(cardTexts.some(text => text.includes('Linux/Open CV'))).toBe(true)

    // Click "View Project" on Tic-Tac-Toe Model
    const tictactoeCard = projectCards.find(card => card.text().includes('Tic-Tac-Toe Model'))
    expect(tictactoeCard).toBeDefined()
    const viewProjectBtn = tictactoeCard!.find('button')
    await viewProjectBtn.trigger('click')

    // Modal should switch to Project Detail mode
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Tic-Tac-Toe Model')

    // Project team members should be listed
    const teamCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(teamCards.length).toBe(1)
    expect(teamCards[0]!.text()).toContain('Tejas Lamba')

    // Click "View Profile" on Tejas Lamba
    const viewProfileBtn = teamCards[0]!.find('button')
    await viewProfileBtn.trigger('click')

    // Modal should switch back to showing Tejas Lamba
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Tejas Lamba')

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

    // Find all project cards
    const projectCards = wrapper.findAll('.hover-profile-card')
    expect(projectCards.length).toBeGreaterThan(0)

    // Find the project card for Tic-Tac-Toe Model
    const ticTacToeCard = projectCards.find((card) => card.text().includes('Tic-Tac-Toe Model'))
    expect(ticTacToeCard).toBeDefined()

    // Click on the project card
    await ticTacToeCard!.trigger('click')

    // Modal should now be open in Project Detail mode
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Tic-Tac-Toe Model')

    // Check if team members are listed
    const teamCards = wrapper.findAll('.detail-modal-content .sub-card')
    expect(teamCards.length).toBe(1)
    expect(teamCards[0]!.text()).toContain('Tejas Lamba')

    // Click "View Profile" on Tejas Lamba
    const viewProfileBtn = teamCards[0]!.find('button')
    await viewProfileBtn.trigger('click')

    // Modal should switch to Person Detail mode
    expect(wrapper.find('.detail-modal-content h2').text()).toBe('Tejas Lamba')

    // Close the details modal
    const closeBtn = wrapper.find('.btn-close')
    await closeBtn.trigger('click')

    // Modal should be closed
    expect(wrapper.find('.detail-modal-overlay').exists()).toBe(false)
  })
})
